import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import './App.scss';
import socketIOClient from 'socket.io-client';

// Views
import CharacterSelection from './views/CharacterSelection/CharacterSelection';
import Game from './views/Game/Game';
import Result from './views/Result/Result';
import WaitingRoom from './views/WaitingRoom/WaitingRoom';
import Error404 from './views/Error404/Error404';

// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

export class App extends Component {
    socket = socketIOClient('http://127.0.0.1:3001');

    state = {
        token: '',
        connectedClients: 0,
        animal: ''
    };

    getToken = () => {
        return this.state.token;
    }

    setToken = (token) => {
        this.setState(
            {
                token: token
            },
            () => {
                sessionStorage.setItem('token',this.state.token);
            }
        );
    }

    removeToken = () => {
        this.setState(
            {
                token: ''
            },
            () => {
                sessionStorage.removeItem('token');
            }
        );
    }

    hasToken = () => {
        if(this.state.token === '' || !this.state.token){
            return false;
        }else{
            return true;
        }
    }
    
    getConnectedClients = () => {
        return this.state.connectedClients;
    }

    setConnectedClients = (connectedClients) => {
        this.setState(
            {
                connectedClients: connectedClients
            },() => {console.log(this.getConnectedClients());}
        );
    }

    componentDidMount(){
        console.log('mount');
        this.removeToken();
        this.socket.on('remove-data', (message) => {
            this.removeToken();
            console.log(message);
        });
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div className="app-container">
                        <Header removeToken={this.removeToken} socket={this.socket} setConnectedClients={this.setConnectedClients}></Header>
                        <Switch>
                            <Route path="/" exact render={props => { return <CharacterSelection {...props} socket={this.socket} setToken={this.setToken} getToken={this.getToken} removeToken={this.removeToken} setConnectedClients={this.setConnectedClients}></CharacterSelection> }}></Route>
                            {this.hasToken() ?
                                <Route path="/game" exact render={props => { return <Game {...props} socket={this.socket}></Game> }}></Route>
                                :
                                <Redirect to='/'></Redirect>
                            }
                            {this.hasToken() ?
                                <Route path="/result" exact component={Result}></Route>
                                :
                                <Redirect to='/'></Redirect>
                            }
                            {this.hasToken() ?
                                <Route path="/wait" exact render={props => { return <WaitingRoom {...props} socket={this.socket} getToken={this.getToken} initialConnectedClients={this.state.connectedClients} getConnectedClients={this.getConnectedClients}></WaitingRoom> }}></Route>
                                :
                                <Redirect to='/'></Redirect>
                            }
                            <Route component={Error404}></Route>
                        </Switch>
                        <Footer></Footer>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App

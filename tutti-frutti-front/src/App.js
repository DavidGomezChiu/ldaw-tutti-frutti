import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
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
        connectedClients: 0
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
                localStorage.setItem('token',this.state.token);
            }
        );
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

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div className="app-container">
                        <Header socket={this.socket} setConnectedClients={this.setConnectedClients}></Header>
                        <Switch>
                            <Route path="/" exact render={props => { return <CharacterSelection {...props} socket={this.socket} setToken={this.setToken} getToken={this.getToken} setConnectedClients={this.setConnectedClients}></CharacterSelection> }}></Route>
                            <Route path="/game" exact component={Game}></Route>
                            <Route path="/result" exact component={Result}></Route>
                            <Route path="/wait" exact render={props => { return <WaitingRoom {...props} socket={this.socket} getConnectedClients={this.getConnectedClients}></WaitingRoom> }}></Route>
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

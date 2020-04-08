import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.scss';

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
    state = {
        token: ''
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

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div className="app-container">
                        <Header></Header>
                        <Switch>
                            <Route path="/" exact render={props => { return <CharacterSelection {...props} setToken={this.setToken} getToken={this.getToken}></CharacterSelection> }}></Route>
                            <Route path="/game" exact component={Game}></Route>
                            <Route path="/result" exact component={Result}></Route>
                            <Route path="/wait" exact component={WaitingRoom}></Route>
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

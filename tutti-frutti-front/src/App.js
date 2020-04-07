import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
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

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <div>
                    <Header></Header>
                    <Switch>
                        <Route path="/" exact component={CharacterSelection}></Route>
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
};

export default App;
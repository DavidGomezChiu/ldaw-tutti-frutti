import React, { Component } from 'react'
import './WaitingRoom.scss'

export class WaitingRoom extends Component {
    state = {
        message: '',
        connectedClients: 0
    }

    _isMounted = false;

    componentDidMount(){
        this._isMounted = true;
        this.setState({
            connectedClients: this.props.initialConnectedClients
        }, () => {
            this.determineMessage();
            this.props.socket.emit('player-waiting',this.props.getToken());
            this.props.socket.on('connected-clients',(connectedClients) => {
                if(this._isMounted){
                    this.setState(
                        {
                            connectedClients:connectedClients
                        },
                        () => {
                            this.determineMessage();
                        }
                    );
                }
            });
        });
    }

    componentDidUpdate(){
        console.log(this.state);
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    determineMessage(){
        if(this._isMounted){
            if(this.state.connectedClients < 2){
                console.log('menos de dos jugadores');
                this.setState({message: 'Esperando más jugadores'});
            }else{
                console.log('más de dos jugadores');
                this.props.socket.emit('game-in-progress', (gameInProgress) => {
                    console.log('game in progress: '+gameInProgress);
                    if(!gameInProgress){
                        this.goToGame();
                    }else{
                        this.setState(
                            {
                                message: 'Juego en progreso'
                            },
                            () => {
                                console.log('esperando a que avisen');
                                this.props.socket.on('game-has-finished', (gameHasFinished) => {
                                    console.log('ya me avisaron');
                                    this.goToGame();
                                });
                            }
                        );
                    }
                });
            }
        }
    }

    goToGame(){
        this.setState({message: 'Listo!'});
        this.props.socket.emit('player-ready', () => {
            this.props.history.push('/game');
        });
    }

    render() {
        return (
            <div className="container">
                <h2 className="message">{this.state.message}</h2>
            </div>
        )
    }
}

export default WaitingRoom

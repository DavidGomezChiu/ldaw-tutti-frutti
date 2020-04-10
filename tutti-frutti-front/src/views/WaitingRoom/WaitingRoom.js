import React, { Component } from 'react'
import './WaitingRoom.scss'

export class WaitingRoom extends Component {
    state = {
        message: '',
        connectedClients: 0
    }

    componentDidMount(){
        this.setState({
            connectedClients: this.props.initialConnectedClients
        }, () => {
            this.determineMessage();
            this.props.socket.on('connected-clients',(connectedClients) => {
                this.setState(
                    {
                        connectedClients:connectedClients
                    },
                    () => {
                        this.determineMessage();
                    }
                );
            });
        });
    }

    componentDidUpdate(){
        console.log(this.state);
    }

    determineMessage(){
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
                            this.props.socket.on('game-has-finished', (gameHasFinished) => {
                                this.goToGame();
                            });
                        }
                    );
                }
            });
        }
    }

    goToGame(){
        this.setState({message: 'Listo!'});
        this.props.socket.emit('players-ready', () => {
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

import React, { Component } from 'react'

export class Game extends Component {

    endGame = () => {
        this.props.history.push('/wait');
        setTimeout(() => {
            this.props.socket.emit('end-game',true);
        },3000)
    }

    componentDidMount(){
        setTimeout(() => {
            console.log('terminando el juego');
            this.endGame();
        },10000);
    }

    render() {
        return (
            <div>
                El juego
            </div>
        )
    }
}

export default Game

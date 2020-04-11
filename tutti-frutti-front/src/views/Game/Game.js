import React, { Component } from 'react'

export class Game extends Component {

    endGame = async () => {
        await this.props.history.push('/wait');
        setTimeout(() => {
            this.props.socket.emit('end-game',true);
        },3000)
    }

    componentDidMount(){
        setTimeout(async () => {
            console.log('terminando el juego');
            await this.endGame();
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

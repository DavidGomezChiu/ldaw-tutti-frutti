import React, { Component } from 'react';
import './Game.scss';
import ChosenLetter from '../../components/ChosenLetter/ChosenLetter';
import Categories from '../../components/Categories/Categories';

export class Game extends Component {
    state = {
        name: '',
        color: '',
        fruit: ''
    }

    setValues = (field,value) => {
        if(field === 'name'){
            this.setState({
                name: value
            });
        }
        if(field === 'color'){
            this.setState({
                color: value
            });
        }
        if(field === 'fruit'){
            this.setState({
                fruit: value
            });
        }
    }

    endGame = async () => {
        await this.props.history.push('/wait');
        setTimeout(() => {
            this.props.socket.emit('end-game',true);
        },3000)
    }

    componentDidMount(){
        /*
        setTimeout(async () => {
            console.log('terminando el juego');
            await this.endGame();
        },10000);
        */
    }

    render() {
        return (
            <div>
                <ChosenLetter socket={this.props.socket}></ChosenLetter>
                <Categories setValues={this.setValues}></Categories>
            </div>
        )
    }
}

export default Game

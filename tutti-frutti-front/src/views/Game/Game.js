import React, { Component } from 'react';
import './Game.scss';
import ChosenLetter from '../../components/ChosenLetter/ChosenLetter';
import Categories from '../../components/Categories/Categories';
import EndButton from '../../components/EndButton/EndButton';

export class Game extends Component {
    state = {
        name: '',
        color: '',
        fruit: '',
        number: 0,
        ending: false
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
        this.props.socket.emit('end-game',true);
    }

    componentDidMount(){
        this.props.socket.on('countdown', (number) => {
            this.setState({
                number: number,
                ending: true
            },
            () => {
                console.log(this.state.number);
                if(this.state.number == 0){
                    this.props.socket.emit('grade-me', this.state.name, this.state.color, this.state.fruit, sessionStorage.getItem('token'), (grade) => {
                        console.log('Mi calificación es: '+grade);
                        this.props.socket.emit('send-winners', winners => {
                            console.log(winners);
                            var gameWon = false;
                            winners.forEach(winner => {
                                if(winner.token == sessionStorage.getItem('token')){
                                    gameWon = true;
                                }
                            });
                            if(gameWon){
                                this.props.notify('You won! Contratulations!');
                            }else{
                                this.props.notify('You lost :( Try again?');
                            }
                        });
                    });
                }
            });
        });
        this.props.socket.on('game-ended', () => {
            this.props.history.push('/wait');
        });
    }

    render() {
        return (
            <div>
                <ChosenLetter socket={this.props.socket}></ChosenLetter>
                <Categories className="mb-4" setValues={this.setValues}></Categories>
                <EndButton ending={this.state.ending} number={this.state.number} endGame={this.endGame}></EndButton>
            </div>
        )
    }
}

export default Game

import React, { Component } from 'react';
import './EndButton.scss';
import Button from 'react-bootstrap/Button';

export class EndButton extends Component {
    clicked = false;

    state = {
        message: 'BASTA',
        number: 0
    }

    componentDidUpdate(){
        if(this.props.number != this.state.number){
            this.setState({
                number: this.props.number
            });
        }
    }

    endGame(){
        if(!this.props.ending){
            this.props.endGame();
        }
    }

    render() {
        return (
            <div>
                <div onClick={this.endGame.bind(this)} className="stop">
                    <p>{this.state.number == 0? 'BASTA' : this.state.number}</p>
                </div>
            </div>
        )
    }
}

export default EndButton

import React, { Component } from 'react';
import './EndButton.scss';

export class EndButton extends Component {
    clicked = false;

    state = {
        message: 'STOP',
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
                    <p>{this.state.number == 0? 'STOP' : this.state.number}</p>
                </div>
            </div>
        )
    }
}

export default EndButton

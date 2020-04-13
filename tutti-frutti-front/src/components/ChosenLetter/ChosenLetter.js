import React, { Component } from 'react';
import './ChosenLetter.scss'

export class ChosenLetter extends Component {
    state = {
        letter: ''
    }

    generate(){
        this.props.socket.emit('create-letter',(letter) => {
            this.setState({
                letter: letter
            });
        });
    }

    componentDidMount(){
        this.generate();
    }

    render() {
        return (
            <div className="mt-4">
                <h3>Letra {this.state.letter === ''? '...' : this.state.letter}</h3>
            </div>
        )
    }
}

export default ChosenLetter

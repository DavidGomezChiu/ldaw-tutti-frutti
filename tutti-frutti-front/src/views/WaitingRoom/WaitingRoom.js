import React, { Component } from 'react'
import './WaitingRoom.scss'

export class WaitingRoom extends Component {
    state = {
        message: '',
        connectedClients: 0
    }

    componentDidMount(){
        this.props.socket.on('connected-clients',(connectedClients) => {
            this.setState(
                {
                    connectedClients:connectedClients
                },
                () => {
                    this.determineMessage();
                });
        });
    }

    componentDidUpdate(){
        console.log(this.state);
    }

    determineMessage(){
        if(this.state.connectedClients < 2){
            this.setState({message: 'Esperando más jugadores'});
        }else{
            this.setState({message: 'Listo!'});
        }
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

import React, { Component } from 'react';
import {Link, withRouter, useLocation} from 'react-router-dom';
import './Header.scss';
import Navbar from 'react-bootstrap/Navbar';

export class Header extends Component {
    state = {
        connectedClients: 0
    }

    setConnectedClients = (connectedClients) => {
        this.setState(
            {
                connectedClients: connectedClients
            }
        );
    }

    componentDidMount(){;
        this.props.socket.on('connected-clients',(connectedClients) => {
            this.setConnectedClients(connectedClients);
            this.props.setConnectedClients(connectedClients)
        });
    }

    componentDidUpdate(){
    }

    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" className="bg-info" variant="dark">
                    <Navbar.Brand><Link to='/'>Tutti-Frutti</Link></Navbar.Brand>
                    <Navbar.Brand className="justify-content-end">
                        Jugadores activos: {this.state.connectedClients}
                    </Navbar.Brand>
                </Navbar>
            </div>
        )
    }
}

export default withRouter (Header)

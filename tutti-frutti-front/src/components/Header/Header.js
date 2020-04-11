import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import './Header.scss';
import Navbar from 'react-bootstrap/Navbar';

export class Header extends Component {
    state = {
        connectedClients: 0,
        animal: ''
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

    setAnimal(){
        var animal = sessionStorage.getItem('animal');
        console.log(animal);
        if(animal && animal !== ''){
            return <img className="animal-icon" alt={animal} src={process.env.PUBLIC_URL+'/assets/icons/'+animal+'.svg'}/>
        }
    }

    render() {
        return (
            <div className="header">
                <Navbar collapseOnSelect expand="lg" className="bg-info" variant="dark">
                    <Navbar.Brand><Link to='/' onClick={this.props.removeToken}>Tutti-Frutti</Link></Navbar.Brand>
                    <Navbar.Brand className="justify-content-end">
                        {this.setAnimal()}
                        Jugadores activos: {this.state.connectedClients}
                    </Navbar.Brand>
                </Navbar>
            </div>
        )
    }
}

export default withRouter (Header)

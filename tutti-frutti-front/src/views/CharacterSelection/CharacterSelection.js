import React, { Component } from 'react';
import './CharacterSelection.scss';
import CharacterSelector from '../../components/CharacterSelector/CharacterSelector';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class CharacterSelection extends Component {
    token = '';

    chooseAnimal(animal){
        this.props.setToken('');
        localStorage.removeItem('token');
        this.props.socket.emit('select-animal',animal, (token, response) => {
            this.token = token;
            console.log(this.token);
            this.props.setToken(this.token);

            console.log('connected clients: '+response.connectedClients);
            this.props.setConnectedClients(response.connectedClients);

            this.props.history.push('/wait');
        });
    }

    render() {
        return (
            <div className="content">
                <Container>
                    <Row className="justify-content-center">
                        <Col>
                            <CharacterSelector onSelect={this.chooseAnimal.bind(this)} className="selector"></CharacterSelector>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default CharacterSelection

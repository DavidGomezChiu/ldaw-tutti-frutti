import React, { Component } from 'react';
import './CharacterSelection.scss';
import CharacterSelector from '../../components/CharacterSelector/CharacterSelector';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import socketIOClient from 'socket.io-client';

export class CharacterSelection extends Component {
    token = '';

    chooseAnimal(animal){
        this.props.setToken('');
        localStorage.removeItem('token');

        const socket = socketIOClient('http://127.0.0.1:3001')
        socket.emit('select-animal',animal, (token) => {
            this.token = token;
            console.log(this.token);
            this.props.setToken(this.token);

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

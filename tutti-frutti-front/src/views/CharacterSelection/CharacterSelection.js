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
        this.props.removeToken();
        this.props.socket.emit('select-animal',animal, (token, response) => {
            sessionStorage.setItem('animal',animal);
            this.token = token;
            this.props.setToken(this.token);

            this.props.setConnectedClients(response.connectedClients);

            this.props.history.push('/wait');
        });
    }

    componentDidMount(){
        sessionStorage.removeItem('animal');
        this.props.socket.emit('player-inactive');
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

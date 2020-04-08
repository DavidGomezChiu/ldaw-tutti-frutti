import React, { Component } from 'react';
import './CharacterSelection.scss';
import CharacterSelector from '../../components/CharacterSelector/CharacterSelector';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class CharacterSelection extends Component {
    chooseAnimal(animal){
        console.log(animal);
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

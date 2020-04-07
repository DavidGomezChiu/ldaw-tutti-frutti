import React, { Component } from 'react';
import './CharacterSelector.scss';
import Card from 'react-bootstrap/Card';

export class CharacterSelector extends Component {
    render() {
        return (
            <div>
                <Card className="card mx-auto">
                    <Card.Body>
                        <Card.Title className="mb-3">Escoge un avatar</Card.Title>
                        <div>
                            <img className="animal-icon" alt="Perezoso" src={process.env.PUBLIC_URL+'/assets/icons/sloth.svg'}/>
                            <img className="animal-icon" alt="Oso" src={process.env.PUBLIC_URL+'/assets/icons/bear.svg'}/>
                            <img className="animal-icon" alt="Perro" src={process.env.PUBLIC_URL+'/assets/icons/dog.svg'}/>
                            <img className="animal-icon" alt="Pato" src={process.env.PUBLIC_URL+'/assets/icons/duck.svg'}/>
                            <img className="animal-icon" alt="Caballo" src={process.env.PUBLIC_URL+'/assets/icons/horse.svg'}/>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default CharacterSelector

import React, { Component } from 'react';
import './CharacterSelector.scss';
import Card from 'react-bootstrap/Card';

export class CharacterSelector extends Component {
    selectAnimal = (event) => {
        this.props.onSelect(event.target.name);
    }

    render() {
        return (
            <div>
                <Card className="card mx-auto">
                    <Card.Body>
                        <Card.Title className="mb-3">Escoge un avatar</Card.Title>
                        <img name="sloth" onClick={this.selectAnimal.bind(this)} className="animal-icon" alt="Perezoso" src={process.env.PUBLIC_URL+'/assets/icons/sloth.svg'}/>
                        <img name="bear" onClick={this.selectAnimal.bind(this)} className="animal-icon" alt="Oso" src={process.env.PUBLIC_URL+'/assets/icons/bear.svg'}/>
                        <img name="dog" onClick={this.selectAnimal.bind(this)} className="animal-icon" alt="Perro" src={process.env.PUBLIC_URL+'/assets/icons/dog.svg'}/>
                        <img name="duck" onClick={this.selectAnimal.bind(this)} className="animal-icon" alt="Pato" src={process.env.PUBLIC_URL+'/assets/icons/duck.svg'}/>
                        <img name="horse" onClick={this.selectAnimal.bind(this)} className="animal-icon" alt="Caballo" src={process.env.PUBLIC_URL+'/assets/icons/horse.svg'}/>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default CharacterSelector

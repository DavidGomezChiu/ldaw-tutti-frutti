import React, { Component } from 'react';
import './Categories.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class Categories extends Component {
    state = {
        name: '',
        color: '',
        fruit: ''
    }

    onInputChange(event){
        var value = event.target.value;
        var field = event.target.name;
        this.props.setValues(field,value);
        if(field === 'name'){
            this.setState({
                name: value
            });
        }
        if(field === 'color'){
            this.setState({
                color: value
            });
        }
        if(field === 'fruit'){
            this.setState({
                fruit: value
            });
        }
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col className="mb-5">
                            <h5>Nombre</h5>
                            <input value={this.state.name} name="name" type="text" onChange={this.onInputChange.bind(this)}></input>
                        </Col>
                        <Col>
                            <h5>Color</h5>
                            <input value={this.state.color} name="color" type="text" onChange={this.onInputChange.bind(this)}></input>
                        </Col>
                        <Col>
                            <h5>Fruta</h5>
                            <input value={this.state.fruit} name="fruit" type="text" onChange={this.onInputChange.bind(this)}></input>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Categories

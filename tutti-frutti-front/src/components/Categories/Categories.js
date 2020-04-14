import React, { Component } from 'react';
import './Categories.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'

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
                <Container className="mb-5">
                    <Form>
                        <Row>
                            <Col xm={12} md={4}>
                                <Form.Group>
                                    <Form.Label>
                                        <h5>Name</h5>
                                    </Form.Label>
                                    <Form.Control value={this.state.name} name="name" type="text" onChange={this.onInputChange.bind(this)}></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col xm={12} md={4}>
                                <Form.Group>
                                    <Form.Label>
                                        <h5>Color</h5>
                                    </Form.Label>
                                    <Form.Control value={this.state.color} name="color" type="text" onChange={this.onInputChange.bind(this)}></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col xm={12} md={4}>
                                <Form.Group>
                                    <Form.Label>
                                        <h5>Fruit</h5>
                                    </Form.Label>
                                    <Form.Control value={this.state.fruit} name="fruit" type="text" onChange={this.onInputChange.bind(this)}></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        )
    }
}

export default Categories

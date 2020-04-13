import React, { Component } from 'react';
import './EndButton.scss';
import Button from 'react-bootstrap/Button';

export class EndButton extends Component {
    render() {
        return (
            <div>
                <div className="stop">
                    <p>BASTA</p>
                </div>
            </div>
        )
    }
}

export default EndButton

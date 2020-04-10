import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Error404.scss'

export class Error404 extends Component {
    render() {
        return (
            <div>
                <h2>No encontramos lo que buscabas :/</h2>
                <Link to={'/'}>Pero, ¿por qué no juegas basta? <span role="img" aria-label="wink">😉</span></Link>
            </div>
        )
    }
}

export default Error404

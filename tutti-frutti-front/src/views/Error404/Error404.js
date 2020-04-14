import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Error404.scss'

export class Error404 extends Component {
    render() {
        return (
            <div>
                <h2>We didn't found what you're looking for :/</h2>
                <Link to={'/'}>Play some Tutti-Frutti? <span role="img" aria-label="wink">😉</span></Link>
            </div>
        )
    }
}

export default Error404

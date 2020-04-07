import React, { Component } from 'react';
import './Header.scss';
import Navbar from 'react-bootstrap/Navbar';

export class Header extends Component {
    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" className="bg-info" variant="dark">
                    <Navbar.Brand href="#home">Tutti-Frutti</Navbar.Brand>
                </Navbar>
            </div>
        )
    }
}

export default Header

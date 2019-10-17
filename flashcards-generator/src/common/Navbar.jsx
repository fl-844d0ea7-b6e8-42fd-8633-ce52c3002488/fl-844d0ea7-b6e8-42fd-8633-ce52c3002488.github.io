import React from 'react'
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { LinkContainer } from 'react-router-bootstrap'

const NavigationBar = () => {
    return (
        <Navbar>
            <LinkContainer to="/home/">
                <Nav.Link>
                    <Nav.Item>
                        <Navbar.Brand>Flashcards App</Navbar.Brand>
                    </Nav.Item>
                </Nav.Link>
            </LinkContainer>
            <Nav>
                <LinkContainer to="/create/">
                    <Nav.Link>
                        <Nav.Item>Creaaaaaate</Nav.Item>
                    </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/view/">
                    <Nav.Link>
                        <Nav.Item>Manaaaaaaaage</Nav.Item>
                    </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/test/">
                    <Nav.Link>
                        <Nav.Item>Teeeeesting</Nav.Item>
                    </Nav.Link>
                </LinkContainer>
            </Nav>
        </Navbar>
    )
}

export default NavigationBar
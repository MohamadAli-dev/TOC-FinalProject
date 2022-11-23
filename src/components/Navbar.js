import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './css/Navbar.css'

const Navbarh = props => {
    return (
        <>
            <Navbar className='navBar'>
                <Container>
                    <Navbar.Brand href="/" className='text-primary'>
                        Theory of Computation
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/" className='text-danger'>ε-NFA TO DFA</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default Navbarh;
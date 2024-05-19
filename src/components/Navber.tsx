import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import logo from '../image/logo.png';
import { useMediaQuery } from 'react-responsive';

const NavberMachine: React.FC = () => {

    const isMobile = useMediaQuery({ maxWidth: 767 });

    return (
        <Navbar>
            <Container>
                <Navbar.Brand>
                    <img
                        alt="logo"
                        src={logo}
                        width="65"
                        height="65"
                    />
                    <b className='fs-1 mt-2 px-5'>
                        {isMobile ? "Laundromat" : "Laundromat Management System"}
                    </b>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default NavberMachine;

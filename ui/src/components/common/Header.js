import React from 'react';
import {Navbar,Nav, Card,Tab} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image'
import Logo from '../../Movie_logo/logo1.png'


const Header = (props) => {
    return <Navbar bg="dark" expand="lg" variant="dark">
        {/* <ControlledTabs /> */}
    {/* <Navbar.Brand href="/studentAdd">Add Student</Navbar.Brand> */}
    <Navbar.Collapse id="basic-navbar-nav">
    <Image src={Logo} style={{height: "60px",width: "60px"}}/>        
        <Nav className="mr-auto">
            <Nav.Link as={Link} to="/state" style={{marginTop: "20px",fontSize: "19px",marginLeft: "56px"}}>State</Nav.Link>
        </Nav>
        <Nav className="mr-auto">
            <Nav.Link as={Link} to="/city" style={{marginTop: "20px",fontSize: "19px",marginRight: "1044px"}} >City</Nav.Link>
        </Nav>
        <Nav className="mr-auto">
            <Nav.Link as={Link} to="/movie" style={{marginTop: "20px",fontSize: "19px",marginRight: "1044px"}} >Movie</Nav.Link>
        </Nav>
    </Navbar.Collapse>
  </Navbar>
}

export default Header;
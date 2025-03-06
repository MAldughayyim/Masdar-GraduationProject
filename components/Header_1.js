import React from'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './css/headers.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import {NavLink} from "react-router-dom";
import {Link} from "react-router-dom";
  function Header_1() {
    return (
      <Navbar  fixed="top" data-bs-theme="dark" className='Container'>
      <Container style={ {backgroundcolor:"rgb(114, 181, 184)"}}>
        <NavLink to='/' > <Navbar.Brand className='clickable' >MASDAR</Navbar.Brand> </NavLink>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            
          <NavLink to='/signin' className='button'> sign in</NavLink>  <NavLink to='/signup' className='button'>sign up</NavLink>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
    
  }
  export default Header_1;
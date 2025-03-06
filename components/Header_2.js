import React from'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './css/headers.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import {NavLink} from "react-router-dom";
import {Link} from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useEffect} from "react";
import axios from "axios";
  function Header_2() {
      const [showDialog, setShowDialog] = useState(false);
      const navigate = useNavigate();
      const [title, setTitle] = useState("");
      const handleLogoutClick = () => {
        setShowDialog(true);
      };
    
    
    
      const handleCancelClick = () => {
        setShowDialog(false);
      };
      const handlehistory = () => {
        navigate('/History');
      };
  ///////////////////////////////////////////////////////////////////////////////////////////ما فيه شي فوق ///////////////////////////////////////////////////////////////////////////////
  const handleConfirmClick = () => {

    console.log('Logging out'); 
                                  
    
    //هنا كود اللوق اوت ينحط    // Add your logout logic here

    navigate('/Homepage');  //هذا يوديه للهوم بيج
  };



     useEffect(() => {

    

  axios.get('backend endpoints')   //you do axios post to return the user's name from the backend     // هنا ترجع الاسم من الباك اند
    .then(response => {
      const username = response.data; // adjust this line based on your backend response                //response.data is the user's name 
      setTitle(username);
    })
    .catch(error => {
      setTitle("User");

    });
}


, []);
///////////////////////////////////////////////////////////////////////////////////////////ما فيه شي تحت //////////////////////////////////////////////////////////////////////////////////////
    return (
      <Navbar  fixed="top" data-bs-theme="dark" className='Container'>
      <Container className='Container'>
        <Navbar.Brand className='Pos' >  

      

     <svg className='icon'xmlns="http://www.w3.org/2000/svg" height="34" width="29" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg><span className='Pos1'>
     <NavDropdown
              id="nav-dropdown-dark-example"
              title= {title}                              //{title} // Use the title from the state
              menuVariant="dark"
            >     <NavDropdown.Item onClick={  () =>{navigate('/testingpage');} }>check</NavDropdown.Item>   <br/>
     <NavDropdown.Item onClick={handlehistory}>History</NavDropdown.Item>
            
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogoutClick} >
               Log out
              </NavDropdown.Item>
            </NavDropdown>

            <div>
            {showDialog&&<div className='overlay'></div>}
            <div className={`logout-confirmation ${showDialog ? 'show' : ''}`}>
        <p style={{color:"white"}}>Are you sure you want to log out?</p>
          <br/> 
          <Link onClick={handleConfirmClick}><button >Yes</button></Link> 
          <button onClick={handleCancelClick}>No</button>
        </div>

  
    </div>

     </span> 
     </Navbar.Brand> 
        <Navbar.Toggle />
       
      </Container>
    </Navbar>
    );
    
  }
  export default Header_2;
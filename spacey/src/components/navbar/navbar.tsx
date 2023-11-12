// import React from "react";
// import spaceY from "./spacey_white.png"

// function NavBar() {
//     return (
//       <div className="top">
//       <a href="/starships" className="a">
//           <div className="top_element">
//               <img src={spaceY} alt="" className="icon"/>
//           </div>
//       </a>
//   </div>
//     )
//   }
  
//   export default NavBar;

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from './spacey_white.png'
import './navbar.css'


function Navigate() {
  return (
    
    <Navbar expand="lg" className="mynavbar" data-bs-theme="dark" fixed='top'>
      <Container>
      <Navbar.Brand href="/starships">
            <img
              src={logo}
              width="100%"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/starships">Корабли</Nav.Link>
            <Nav.Link href="#link">ПримерСсылки</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigate;
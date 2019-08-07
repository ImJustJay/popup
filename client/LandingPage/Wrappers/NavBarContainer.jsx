import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../Components/NavBar.jsx'


const NavBarContainer = (props) => (
  //change classname to navBar.
  <div className='allcards'>
   <NavBar showLoginMenu={props.showLoginMenu} />
  </div>
);


export default NavBarContainer;
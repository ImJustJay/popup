import React from 'react';
import image from '../../Assets/covorphoto.jpg';
import { Button } from 'reactstrap';


const HeaderImage = (props) => (
  <div className="headerimage">
    <img id='headerimage'src={image}></img>
    <Button id='createevent' onClick={props.showCreateEventBox} color="primary">Create an Event</Button>{' '}
  </div> 
)

export default HeaderImage;
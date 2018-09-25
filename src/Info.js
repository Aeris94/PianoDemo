import React from 'react'
import './App.css';

const Info = (props) =>
{
  if(!props.renderInfo)
  {
    return null;
  }
  
  return(
    <div className="extraBox">
      <div className="exit" id="infoExit" onClick = {props.onClick}>
        <i className="fa fa-times fa-2x" />
      </div>
      
      <h1>{props.title}</h1>
      <div>{props.text}</div>
    </div>
  )
}

export default Info;

import React from 'react'
import './App.css';

const SetKey = (props) =>
{
  const classes = `${props.cssClass} key`;
  return(
    <div id={props.id} className={classes} onClick={props.onClick}>
      <input type="text" className="setInput" 
             value={String.fromCharCode(props.keyCode)} 
             onChange={props.inputChange}/>  
      <div className="keyTitle">{props.id}</div>
    </div>
  )
}
export default SetKey;
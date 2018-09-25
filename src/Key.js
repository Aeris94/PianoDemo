
import React from 'react'
import './App.css';

const Key = (props) =>
{
  const classes = `${props.cssClass} key`;
  return(
    <div id={props.id} className={classes} onClick={props.onClick}/>
  )
}

export default Key;

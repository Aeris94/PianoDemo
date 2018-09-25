import React from 'react'
import Key from './Key.js';
import SetKey from './SetKey.js';
import './App.css';

const Keyboard = (props) =>
{   
    const notes = window._.zip(props.octave, props.keys);
    return(
      <div id="keyboard">
        {notes.map((value) => {
           if(!props.renderSetting) 
           {  
              return <Key id={value[0]} 
                cssClass={value[0].indexOf("#") < 0 ? "whiteKey" : "blackKey"}
                onClick={props.onClick}/>
           }
           
           return (<SetKey id={value[0]} 
                cssClass={value[0].indexOf("#") < 0 ? "whiteKey" : "blackKey"}
                keyCode={value[1]}
                inputChange={props.inputChange}
                onClick={props.onClick}/> )       
        })} 
      </div>
)}
export default Keyboard;

import React from 'react'
import './App.css';

const OptionPanel = (props) =>
{
  return(
    <div id="optionPanel">
      
      <div id="icons">
        <div id="default" title="Default settings">
          <i className="fa fa-undo fa-2x" />
        </div>
        <div id="setting" title="Set keyboard keys">
           <i className="fa fa-cogs fa-2x"/>          
        </div>
        <div id="info" title="About this tunning">
          <i className="fa fa-info fa-2x"/>
        </div>
      </div> 
    
      <div id="tempSelection">
        <select id="numberSelection" onChange = {props.onNumberChange}>
          {props.notesNum.map(item =>
            {
              return <option value={item}>{item}</option>
            }
          )}
        </select>
    
        <select id="temSelection" onChange={props.onChange}>  
          {props.tunnings.map(item =>
            {
              return <option value={item}>{item}</option>
            }
          )}
        </select>
      </div>
    </div>
  )  
}
export default OptionPanel;
import React, { Component } from 'react';
import './App.css';
import Keyboard from './Keyboard.js';
import Info from './Info.js';
import OptionPanel from './OptionPanel.js';



class App extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
        
      notes: [],
      keyCodes: [],
      notesPerOctave: [12, 19],
      currentNotesPerOctave: 12,
      tunnings: ["Equal temperament"],
      synth: "",
      currentTemp: {},  
      renderInfo: false,
      renderSettings: false,
    }
    
    this.playSound = this.playSound.bind(this);
    this.onTempChange = this.onTempChange.bind(this);
    this.animateKey = this.animateKey.bind(this);
    this.keydownSound = this.keydownSound.bind(this);
    this.clickSound = this.clickSound.bind(this);
    this.toggleBox = this.toggleBox.bind(this);
    this.onKeyChange = this.onKeyChange.bind(this);
    this.setDefault = this.setDefault.bind(this);
    this.generateNotes = this.generateNotes.bind(this);
    this.generateKeyboardLayout = this.generateKeyboardLayout.bind(this);
    this.onNumberChange = this.onNumberChange.bind(this);
    this.generateKeyboardKeys = this.generateKeyboardKeys.bind(this);
    this.generateEqualTemp = this.generateEqualTemp.bind(this);
  }

  generateEqualTemp(notes)
  {
    let num = notes.length -1;
    let temp = {};
    let step = Math.pow(2, (1/num));
    let referenceFr = 440;
    let indexOfA = notes.indexOf("A4");
    // eslint-disable-next-line
    notes.map((note, index) => {
       temp[note] = referenceFr*Math.pow(step, (index - indexOfA));
    });
    return temp;
  }
  
  generateNotes(num)
  {
    if(num === 19)
      return ["C4", "C#4", "Db4", "D4", "D#4", "Eb4", "E4", "E#4", "F4", "F#4", "Gb4", "G4", "G#4", "Ab4", "A4", "A#4", "Bb", "B4", "B#4", "C5"] 
   
     return ["C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", "C5"];
  }
  
  generateKeyboardKeys(num)
  {
    if(num === 19)
      return ["81", "50", "87", "69", "52", "82", "84", "54", "89", "55", "85", "73", "57", "79", "80", "83", "88", "67", "70", "86"];
    
      return  ["81", "50", "87", "51", "69", "82", "53", "84", "54", "89", "55", "85", "73"]; 
  }
 
  generateKeyboardLayout(num)
  {
    let width = num === 19? 13: 8;
    let whiteKeys = 2*(num-7) + 2;
    document.querySelector("#keyboard").style.gridTemplateColumns = `repeat(${whiteKeys}, 1fr)`;
    document.querySelector("#keyboard").style.width = `${width*62}px`;
    let keys = [...document.querySelectorAll(".key")];
    let line = 1;
    
    // eslint-disable-next-line
    keys.map(key =>{
      if(key.id.indexOf('#') < 0)
      {
        key.style.gridColumn = `${line} / ${line+2}`;
        key.style.gridRow = `1`;
        line = line + 2;
      }  
      else
      {
        key.style.gridColumn = `${line -1} / ${line + 1}`;
        key.style.gridRow = "1";
      }
    });
  }
  
  componentWillMount()
  {
    let notes = this.generateNotes(12);
    let keys = this.generateKeyboardKeys(12);
    let temp = this.generateEqualTemp(notes);
    
    this.setState({currentTemp: temp, 
                   synth: new window.Tone.PolySynth(4, window.Synth).toMaster(), 
                   notes: notes,
                   keyCodes: keys});
  }
  
  componentDidMount()
  { 
     this.generateKeyboardLayout(12); 
  
     const keydown = this.keydownSound;
     const toggle = this.toggleBox; 
     const reset = this.setDefault;
        
     document.addEventListener('keydown', keydown);
     document.querySelector("#info").addEventListener('click', toggle); 
     document.querySelector("#setting").addEventListener('click', toggle);
     document.querySelector("#default").addEventListener('click', reset);
  } 
  
  toggleBox(e)
  {
     let notesNumber = this.state.currentNotesPerOctave;
     let renderInfo;
     let renderSetting;
     let id = e.currentTarget.id.toLowerCase();    
     if(id.indexOf("info") > -1)
       renderInfo = !this.state.renderInfo;
     if(id.indexOf("setting") > -1)
       renderSetting = !this.state.renderSetting; 
    
     this.setState({renderInfo: renderInfo, renderSetting: renderSetting}, 
                  () => this.generateKeyboardLayout(notesNumber));  
  }
  
  clickSound(e)
  {
    let temp = this.state.currentTemp;
    this.playSound(temp[e.currentTarget.id]);
    this.animateKey(e.currentTarget.id);
  }
  
  keydownSound(e)
  {
    let sound = this.playSound;
    let animate = this.animateKey;
    let notes = window._.zip(this.state.notes, this.state.keyCodes);
    let temp = this.state.currentTemp;
    let keyCode = e.keyCode.toString(); 
    let notesToPlay = notes.filter(item => item[1] === keyCode);
    
    if(notesToPlay !== null)
    {   
        // eslint-disable-next-line
        notesToPlay.map(note => {
          sound(temp[note[0]]);
          animate(note[0]);
        })
    }
  }
  
  playSound(note)
  {
     this.state.synth.triggerAttackRelease(note, '8n'); 
  }
  
  animateKey(keyId)
  {
    document.getElementById(keyId).animate([
  // keyframes
  { border: '1px solid black' }, 
  { border: '4px solid black' },
  { border: '1px solid black' },    
], { 
  // timing options
  duration: 100,
});
  }
  
  onNumberChange(e)
  {
    let number = document.getElementById("numberSelection");
    let selectedOption = Number(number.options[number.selectedIndex].text);
    let keys = this.generateKeyboardKeys(selectedOption);
    let notes = this.generateNotes(selectedOption);
    let temp = this.generateEqualTemp(notes);
    
    this.setState({notes: notes, 
                   currentNotesPerOctave: selectedOption, 
                   keyCodes: keys,
                   currentTemp: temp},    
                 () => this.generateKeyboardLayout(selectedOption) );
  }
  
  onTempChange()
  {
     let select = document.getElementById("selection");
     let selectedOption = select.options[select.selectedIndex].text;
     let temp = this.state[selectedOption]; 
     this.setState({currentTemp: temp});
  }
  
  onKeyChange(e)
  { 
     let keyCode = e.currentTarget.value.toUpperCase().charCodeAt("0");
     let id = e.currentTarget.parentNode.id;
     let index = this.state.notes.indexOf(id); 
    // eslint-disable-next-line
     this.state.keyCodes[index] = keyCode.toString();
     this.forceUpdate(); 
  }
  
  setDefault()
  {
    // eslint-disable-next-line
    this.state.keyCodes = this.generateKeyboardKeys(this.state.currentNotesPerOctave);
    this.forceUpdate();
  }
  
  render()
  {
    return(
      <div id="tuningsApp">
        <OptionPanel tunnings={this.state.tunnings} onChange={this.onTempChange}
                     notesNum={this.state.notesPerOctave}
                     onNumberChange={this.onNumberChange}/>
        <Keyboard octave={this.state.notes} 
                  renderSetting={this.state.renderSetting}
                  keys={this.state.keyCodes}
                  inputChange={this.onKeyChange}
                  onClick={this.clickSound}/>
                    
        <Info renderInfo={this.state.renderInfo} 
              title="Blala" text="adadad"
              onClick={this.toggleBox}/>  
                
      </div>
    )
  }
}

export default App;

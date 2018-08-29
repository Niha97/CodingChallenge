import React, { Component } from 'react';
import './App.css';
import moment from 'moment';

class App extends Component {

  state={
    hour: 0,
    minutes: 0,
    seconds:0 
  
  }

  inputHandler = (e) =>{  
    console.log(e.target.name);
    this.setState({[e.target.name]: e.target.value});
  }

  startTimer = () => {

    if(this.state.hour!==0||this.state.minutes!==0||this.state.seconds!==0){
      if(this.state.seconds!==0&&this.state.minutes===0){
      this.timer=setInterval(() => {
        this.setState({seconds:this.state.seconds-1}) 
        if(this.state.seconds===0){clearInterval(this.timer)};
      }, 1000);}

      if(this.state.minutes!==0&&this.state.seconds===0){
        this.setState({seconds:60});
        this.timer=setInterval(() => {
          this.setState({seconds:this.state.seconds-1})
          if(this.state.seconds===0){
            if(this.state.minutes!==0){
              this.setState({minutes:this.state.minutes-1, seconds:60});
            }
            else{clearInterval(this.timer)}
          }
        },1000)
      }

    }
   
    console.log("start");
  }
  stopTimer  = () => {
    clearInterval(this.timer);
    console.log("stop")
  }
  resetTimer  = () => {
    this.setState({hour:0, minutes:0, seconds:0});
    console.log("reset")
  }


  render() {
    return (
      <div className="App">
         <h1 className="title"> (( React Countdown )) </h1>
         <div className="inputGroup">
            <h3>Min</h3>
            <input type="number"  value={this.state.minutes}   name="minutes"  onChange={(e) => this.inputHandler(e)} />
            <h3>Sec</h3>
            <input type="number"  value={this.state.seconds}   name="seconds"  onChange={(e) => this.inputHandler(e)} />
         </div>
         <div>
            <button onClick={this.startTimer} className="start">start</button>
            <button onClick={this.stopTimer}  className="stop">stop</button>
            <button onClick={this.resetTimer}  className="reset">reset</button>
         </div>
         <h1> Timer {this.state.minutes} : {this.state.seconds} </h1>
      </div>

    );
  }
}

export default App;

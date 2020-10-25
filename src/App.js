import React, { useState, useRef } from 'react';
import './App.css';

const App = () => {

  const timerRef = useRef();
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const latestSeconds = useRef(seconds);
  const latestMinutes = useRef(minutes);
  const latestHours = useRef(hours);

  const hoursRef = useRef();
  const minutesRef = useRef();
  const secondsRef = useRef();

  const convertToSeconds = () => {
    return latestSeconds.current + latestMinutes.current * 60 + latestHours.current * 60 * 60;
  };

  const startTimer = () => {
    timerRef.current = setInterval(countDown, 1000);
  }

  const countDown = () => {
    let c_seconds = convertToSeconds();
    if(c_seconds) {

      // seconds change
      if(latestSeconds.current) {
        latestSeconds.current = latestSeconds.current-1;
        setSeconds(seconds => seconds-1);
      } else {
        latestSeconds.current = 59;
        setSeconds(59);
      }

      // minutes change
      if(c_seconds % 60 === 0 && latestMinutes.current) {
        latestMinutes.current = latestMinutes.current-1;
        setMinutes(minutes => minutes-1)
      }

      // when only hours entered
      if(!minutes && latestHours.current) {
        latestMinutes.current = 59;
        setMinutes(59);
      }

      // hours change
      if(c_seconds % 3600 === 0 && latestHours.current) {
        latestHours.current = latestHours.current-1;
        setHours(hours => hours-1);
      }

    } else {
      clearInterval(timerRef.current);
    }
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
  }

  const resetTimer = () => {
    setSeconds(0);
    setMinutes(0);
    setHours(0);

    hoursRef.current.value = 0;
    minutesRef.current.value = 0;
    secondsRef.current.value = 0;
  }

  return(
    <div className="App">
      <h1 className="title"> (( React Countdown )) </h1>
      <div className="inputGroup">
        <h3>Hrs</h3>
        <input ref={hoursRef} type="number" placeholder={0}  name="hours"  onChange={(e) => {latestHours.current = Number(e.target.value); setHours(Number(e.target.value))}} />
        <h3>Min</h3>
        <input  ref={minutesRef} type="number"  placeholder={0}   name="minutes"  onChange={(e) => {latestMinutes.current = Number(e.target.value);setMinutes(Number(e.target.value))}} />
        <h3>Sec</h3>
        <input   ref={secondsRef} type="number"  placeholder={0}  name="seconds"  onChange={(e) => {latestSeconds.current = Number(e.target.value); setSeconds(Number(e.target.value))}} />
      </div>
      <div>
        <button onClick={startTimer} className="start">start</button>
        <button onClick={stopTimer}  className="stop">stop</button>
        <button onClick={resetTimer}  className="reset">reset</button>
      </div>
      <h1> Timer {hours}: {minutes} : {seconds} </h1>
    </div>
  );
}

export default App;

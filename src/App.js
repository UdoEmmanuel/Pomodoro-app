import React, { useState, useEffect } from 'react';
import './App.css';
import sound from './assets/Beep.mp3';

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState("25");
  const [mins, setMins] = useState("25");
  const [secs, setSecs] = useState("00");
  const [timeLeft, setTimeLeft] = useState("");
  const [cycle, setCycle] = useState("session");

  const audio = document.getElementById('beep');

  useEffect( () => {
    if (isRunning) {
      
      const intervalId = setInterval( () => {
        const duration = (cycle === 'break' ? breakLength : sessionLength) * 60;
        const timeRemaining = (timeLeft ? timeLeft : duration) - 1;
        setTimeLeft(timeRemaining);
        
        const min = Math.floor(timeRemaining / 60);
        const sec = timeRemaining % 60;

        if (timeRemaining >= 0){
          
          setMins(min < 10 ? `0${min}` : min);
          setSecs(sec < 10 ? `0${sec}` : sec);

          if (timeRemaining === 0 && cycle === "session"){
            playTimerSound();
            setCycle("break");
            return;
          } 
          if (timeRemaining === 0 && cycle === "break"){
            playTimerSound();
            setCycle("session");
            
          }
          
        }
      }, 1000);

      console.log(cycle)
      return () => clearInterval(intervalId);
    }
  }, [isRunning, timeLeft])

  const startTimer = () => {
    setIsRunning(
      isRunning
      ? false 
      : true
    )
  }
  
  const playTimerSound = () => {
    audio.play();
  }

  const breakIncrement = () => {
    setBreakLength(
      (breakLength <= 59 && !isRunning) 
      ? parseInt(breakLength) + 1 
      : breakLength
    );
  }

  const breakDecrement = () => {
    setBreakLength(
      (breakLength >= 2 && !isRunning) 
      ? parseInt(breakLength) - 1 
      : breakLength
    );
  }
    

  const sessionIncrement = () => {
    setSessionLength(
      (sessionLength <= 59 && !isRunning) 
      ? parseInt(sessionLength) + 1 
      : sessionLength
    );
  }

  const sessionDecrement = () => {
    setSessionLength(
      (sessionLength >= 2 && !isRunning) 
      ? parseInt(sessionLength) - 1 
      : sessionLength
    );
  }

  const resetTimer = () => {
    setMins("25");
    setSecs("00");
    setIsRunning(false);
    setBreakLength("5");
    setSessionLength("25");
    setTimeLeft("");
    setCycle('session')
    audio.pause()
  }

  return (
    <div className="App flex">
      <div id='timer-display' className='flex' style={{color: cycle === 'break' ? '#1008b9' : '#000'}}>
        <p className='timer-label'>{cycle === 'break' ? 'Break' : 'Session'}</p>
        <h1 id='time-left'><span className='min'>{mins}</span>:<span className='sec'>{secs}</span></h1>
        <audio src={sound} id='beep'></audio>
      </div>
      <div id='timer-length' className='flex'>
        <div className='left length'>
          <p id='break-label' className='break label'>Break Length</p>
          <div className='break-controls controls flex'>
          <span id='break-decrement' className="material-symbols-outlined" onClick={breakDecrement}>do_not_disturb_on</span>
          <h2 className='break-length'>{breakLength}</h2>
          <span id='break-increment' className="material-symbols-outlined" onClick={breakIncrement}>add_circle</span>
          </div>
        </div>
        <div className='right length'>
          <p id='session-label' className='session label'>Session Length</p>
          <div className='session-controls controls flex'>
          <span id='session-decrement' className="material-symbols-outlined" onClick={sessionDecrement}>do_not_disturb_on</span>
          <h2 className='session-length'>{sessionLength}</h2>
          <span id='session-increment' className="material-symbols-outlined" onClick={sessionIncrement}>add_circle</span>
          </div>
        </div>
      </div>
      <div id='timer-controls' className='flex'>
          <span id='start_stop' className="material-symbols-outlined dark" onClick={startTimer}>not_started</span>
          <span id='reset' className="material-symbols-outlined dark" onClick={resetTimer}>sync</span>      
      </div>
    </div>
  );
}

export default App;

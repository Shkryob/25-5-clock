import {useEffect, useRef, useState} from 'react'
import logo from './logo.svg'
import './App.css'

const initSettings = {
  breakLength: 5,
  sessionLength: 25
}

const PAUSE_STATE = 'PAUSE';
const SESSION_STATE = 'SESSION';
const BREAK_STATE = 'BREAK';

function pad(s) {
  s = '0' + s;
  return s.substr(s.length - 2, 2);
}

function displayTime(time) {
  return pad(Math.floor(time / 60)) + ':' + pad(time % 60);
}

let interavlID = null;

function App() {
  const [settings, setSettings] = useState(initSettings)
  const [currentState, setState] = useState({
    state: PAUSE_STATE,
    timeLeft: initSettings.sessionLength * 60,
  })
  const [displayStatus, setDisplayStatus] = useState('Session')
  const beepRef = useRef(null)

  function decrementBreak() {
    setSettings((settings) => {
      if (settings.breakLength === 1 || currentState.state != PAUSE_STATE) {
        return settings;
      }

      return {...settings, breakLength: settings.breakLength - 1}
    })
  }

  function incrementBreak() {
    setSettings((settings) => {
      if (settings.breakLength === 60 || currentState.state != PAUSE_STATE) {
        return settings;
      }

      return {...settings, breakLength: settings.breakLength + 1}
    })
  }

  function decrementSession() {
    setSettings((settings) => {
      if (settings.sessionLength === 1 || currentState.state != PAUSE_STATE) {
        return settings;
      }
      setState((currentState) => {
        return {...currentState, timeLeft: (settings.sessionLength - 1) * 60};
      });

      return {...settings, sessionLength: settings.sessionLength - 1}
    })
  }

  function incrementSession() {
    setSettings((settings) => {
      if (settings.sessionLength === 60 || currentState.state != PAUSE_STATE) {
        return settings;
      }
      setState((currentState) => {
        return {...currentState, timeLeft: (settings.sessionLength + 1) * 60};
      });

      return {...settings, sessionLength: settings.sessionLength + 1}
    })
  }

  function beep() {
    beepRef.current.play();
  }

  function countDown() {
    interavlID = setInterval(() => {
      setState((currentState) => {
        let newState = currentState.state;
        let newTimeLeft = currentState.timeLeft;
        if (currentState.timeLeft === 0) {
          beep();
          if (currentState.state === SESSION_STATE) {
            setDisplayStatus('Break');
            newTimeLeft = settings.breakLength * 60;
            newState = BREAK_STATE;
          } else {
            setDisplayStatus('Session');
            newTimeLeft = settings.sessionLength * 60;
            newState = SESSION_STATE;
          }
        } else {
          newTimeLeft -= 1
        }

        return {timeLeft: newTimeLeft, state: newState};
      });
    }, 1000);
  }

  function stopCountDown() {
    beepRef.current.pause();
    beepRef.current.currentTime = 0;
    if (interavlID) {
      clearInterval(interavlID);
      interavlID = null;
    }
  }

  function startStop() {
    if (currentState.state === PAUSE_STATE) {
      setState((currentState) => {
        return {...currentState, state: SESSION_STATE};
      });
      countDown();
    } else {
      setState((currentState) => {
        return {...currentState, state: PAUSE_STATE};
      });
      stopCountDown();
    }
  }

  function reset() {
    setSettings(initSettings);
    setDisplayStatus('Session');
    stopCountDown();

    setState((currentState) => {
      return {state: PAUSE_STATE, timeLeft: initSettings.sessionLength * 60};
    });
  }

  useEffect(() => {
    return () => {
      stopCountDown();
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <label id="break-label">Break Length</label>
        <input id="break-length" type="text" readOnly={true} value={settings.breakLength}/>
        <button id="break-decrement" onClick={decrementBreak}>-</button>
        <button id="break-increment"onClick={incrementBreak}>+</button>

        <label id="session-label">Session Length</label>
        <input id="session-length" type="text" readOnly={true} value={settings.sessionLength}/>
        <button id="session-decrement" onClick={decrementSession}>-</button>
        <button id="session-increment" onClick={incrementSession}>+</button>

        <div id="timer-label">{ displayStatus }</div>
        <div id="time-left">{ displayTime(currentState.timeLeft) }</div>
        <button id="start_stop" onClick={startStop}>Start/Stop</button>
        <button id="reset" onClick={reset}>Reset</button>

        <audio id="beep" ref={beepRef} src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
      </header>
    </div>
  )
}

export default App

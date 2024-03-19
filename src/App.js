import React, { useState } from 'react';
import './App.css';


// import useInterval from './Components/useInterval';
import LandingPage from './Pages/LandingPage/LandingPage';
import StopWatch from './Pages/Stopwatch/Stopwatch';
import Spartacus from './Pages/Spartacus/Spartacus';
import FourOhFour from './Pages/FourOhFour';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import WorkoutComplete from './Pages/WorkoutComplete/WorkoutComplete';
import CustomWork from './Pages/CustomWork/CustomWork';

import { Routes, Route, Link } from 'react-router-dom';

function App() {

  const [title, setTitle] = useState('Welcome!');

  const [spartacusWorkout, setSpartacusWorkout] = useState([
    'Goblet Squats',
    'Mtn. Climbers',
    'Kettle Swings',
    'T Push Ups',
    'Jumping Lunges',
    'Rows',
    'Side Lunges',
    'Renegade Rows',
    'Lunge Twists',
    'Military Press',
  ]);

  // workout states
  const [runTime, setRunTime] = useState(false);
  const [delay] = useState(1000); // delay triggers useEffect 
  const [position, setPosition] = useState(0); // position within the workout
  const [count, setCount] = useState(0); // universal counter
  const [circleTime, setCircleTime] = useState(0); // sets total circle time for timer
  const [rest, setRest] = useState(true); // resting vs working toggle
  const [workTime, setWorkTime] = useState(60); // workout time 60s
  const [restTime, setRestTime] = useState(15); // rest time 15s
  const [buttonToggle, setButtonToggle] = useState(false); // button display


  return (
    <div className="spartanStrength">

      <Header title={title} setTitle={setTitle} />

      <Routes>
        <Route path='/' element={<LandingPage title={title} setTitle={setTitle} />} />

        <Route path='/stopwatch'
          element={
            <StopWatch
              runTime={runTime} setRunTime={setRunTime}
              delay={delay}
              count={count} setCount={setCount}
            />
          }
        />

        <Route path='/spartacus'
          element={
            <Spartacus
              runTime={runTime} setRunTime={setRunTime}
              position={position} setPosition={setPosition}
              delay={delay}
              count={count} setCount={setCount}
              circleTime={circleTime} setCircleTime={setCircleTime}
              rest={rest} setRest={setRest}
              workTime={workTime} setWorkTime={setWorkTime}
              restTime={restTime} setRestTime={setRestTime}
              buttonToggle={buttonToggle} setButtonToggle={setButtonToggle}
              spartacusWorkout={spartacusWorkout}
            />
          }
        />

        <Route path='/custom'
          element={
            <CustomWork
              workTime={workTime} setWorkTime={setWorkTime}
              restTime={restTime} setRestTime={setRestTime}
              setSpartacusWorkout={setSpartacusWorkout}
            />
          }
        />

        <Route path='/workoutComplete' element={<WorkoutComplete setTitle={setTitle} />} />
        <Route path='*' element={<FourOhFour />} />
      </Routes>

      <Footer />

    </div>
  );
}

export default App;


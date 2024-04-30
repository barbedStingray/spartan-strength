import React, { useState } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './App.css';

import LandingPage from './Pages/LandingPage/LandingPage';
import StopWatch from './Pages/Stopwatch/Stopwatch';
import Spartacus from './Pages/Spartacus/Spartacus';
import SelectWorkout from './Pages/SelectWorkout/SelectWorkout';
import CustomWork from './Pages/CustomWork/CustomWork';
import WorkoutComplete from './Pages/WorkoutComplete/WorkoutComplete';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import FourOhFour from './Pages/FourOhFour';



function App() {

  const location = useLocation();

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
  ]); // saved spartacus workout
  const [customWorkout, setCustomWorkout] = useState([]); // saved custom workout
  const [runTime, setRunTime] = useState(false); // starts/stops timer
  const [delay] = useState(1000); // delay triggers useEffect 
  const [position, setPosition] = useState(0); // position within the workout
  const [count, setCount] = useState(0); // universal counter
  const [circleTime, setCircleTime] = useState(0); // sets total circle time for timer
  const [customEdit, setCustomEdit] = useState(false); // allows delete in workout list
  const [exerciseList, setExerciseList] = useState('0'); // master list for components


  const [masterWorkout, setMasterWorkout] = useState('0'); // workout time 60s
  const [workTime, setWorkTime] = useState(60); // workout time 60s
  const [restTime, setRestTime] = useState(15); // rest time 15s





  return (
    <div className="spartanStrength">

      <Header title={title} setTitle={setTitle} />

      <AnimatePresence
        mode='wait'
      // initial={false}
      >
        {/* really important for unmounting/mounting tracking */}
        <Routes location={location} key={location.pathname}>
          <Route path='/'
            element={
              <LandingPage
                setCustomEdit={setCustomEdit}
                setTitle={setTitle}
                setExerciseList={setExerciseList}
                setWorkTime={setWorkTime} setRestTime={setRestTime}
                spartacusWorkout={spartacusWorkout} customWorkout={customWorkout}
              // resetWorkout={resetWorkout}
              />
            }
          />
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
                masterWorkout={masterWorkout} // ****
                exerciseList={exerciseList}
                runTime={runTime} setRunTime={setRunTime}
                position={position} setPosition={setPosition}
                delay={delay}
                count={count} setCount={setCount}
                circleTime={circleTime} setCircleTime={setCircleTime}
                // rest={rest} setRest={setRest}
                workTime={workTime} restTime={restTime}
                // buttonToggle={buttonToggle} setButtonToggle={setButtonToggle}
                spartacusWorkout={spartacusWorkout}
                // resetWorkout={resetWorkout} 
                setTitle={setTitle}
              />
            }
          />
          
          <Route path='/custom/:id' element={<CustomWork />} />

          <Route path='/select'
            element={
              <SelectWorkout
                masterWorkout={masterWorkout}
                setMasterWorkout={setMasterWorkout}
                workTime={workTime} setWorkTime={setWorkTime}
                restTime={restTime} setRestTime={setRestTime}
              />
            }
          />

          <Route path='/workoutComplete'
            element={
              <WorkoutComplete
                setTitle={setTitle}
              // resetWorkout={resetWorkout}
              />
            }
          />

          <Route path='*' element={<FourOhFour />} />

        </Routes>
      </AnimatePresence>

      <Footer />

    </div>
  );
}

export default App;


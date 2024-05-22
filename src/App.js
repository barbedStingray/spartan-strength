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
import BenPR from './Pages/BenPR/BenPR';



function App() {

  const location = useLocation();

  const [title, setTitle] = useState('Welcome!');
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

          <Route path='/stopwatch' element={<StopWatch />} />
          <Route path='/custom/:id' element={<CustomWork />} />
          <Route path='*' element={<FourOhFour />} />
          <Route path='/benPR' element={<BenPR />} />

          <Route path='/'
            element={
              <LandingPage
                setTitle={setTitle} setMasterWorkout={setMasterWorkout}
                setWorkTime={setWorkTime} setRestTime={setRestTime}
              />}
          />

          <Route path='/spartacus' element={
            <Spartacus
              masterWorkout={masterWorkout}
              workTime={workTime} restTime={restTime}
              setTitle={setTitle}
            />} />

          <Route path='/select' element={
            <SelectWorkout
              masterWorkout={masterWorkout}
              setMasterWorkout={setMasterWorkout}
              workTime={workTime} setWorkTime={setWorkTime}
              restTime={restTime} setRestTime={setRestTime}
            />} />

          <Route path='/workoutComplete' element={
            <WorkoutComplete
              setTitle={setTitle}
            />} />

        </Routes>
      </AnimatePresence>

      <Footer />

    </div>
  );
}

export default App;


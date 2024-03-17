import React, { useState } from 'react';
import './App.css';


// import useInterval from './Components/useInterval';
import LandingPage from './Pages/LandingPage';
import StopWatch from './Pages/Stopwatch/Stopwatch';
import Spartacus from './Pages/Spartacus/Spartacus';
import FourOhFour from './Pages/FourOhFour';
import Header from './Components/Header';

import WorkoutComplete from './Pages/WorkoutComplete';

import { Routes, Route, Link } from 'react-router-dom';

function App() {

  
  return (
    <div className="spartanStrength">

      <Header />

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/stopwatch' element={<StopWatch />} />
        <Route path='/spartacus' element={<Spartacus />} />
        <Route path='*' element={<FourOhFour />} />
      </Routes>

    </div>
  );
}

export default App;


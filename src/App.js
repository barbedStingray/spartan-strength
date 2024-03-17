import React, { useState } from 'react';
import './App.css';


// import useInterval from './Components/useInterval';
import LandingPage from './Pages/LandingPage/LandingPage';
import StopWatch from './Pages/Stopwatch/Stopwatch';
import Spartacus from './Pages/Spartacus/Spartacus';
import FourOhFour from './Pages/FourOhFour';
import Header from './Components/Header';
import Footer from './Components/Footer';

import WorkoutComplete from './Pages/WorkoutComplete';

import { Routes, Route, Link } from 'react-router-dom';

function App() {

  const [title, setTitle] = useState('Welcome!');


  
  return (
    <div className="spartanStrength">

      <Header title={title} setTitle={setTitle}/>

      <Routes>
        <Route path='/' element={<LandingPage title={title} setTitle={setTitle}/>} />
        <Route path='/stopwatch' element={<StopWatch />} />
        <Route path='/spartacus' element={<Spartacus />} />
        <Route path='*' element={<FourOhFour />} />
      </Routes>

      <Footer />

    </div>
  );
}

export default App;


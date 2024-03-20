import React from 'react';
import { motion as m } from 'framer-motion';
import './WorkoutComplete.css';

import LandingLink from '../../Components/LandingLink';

const WorkoutComplete = ({ setTitle, resetWorkout }) => {

  const options = [
    { path: '/', name: 'Welcome' },
    { path: '/spartacus', name: 'Repeat Glory' }
  ];

  return (
    <m.div 
    className='workoutComplete'
    key={'/custom'}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25, ease: 'easeInOut' }}
    >

      <h1>WORKOUT COMPLETE</h1>
      <p>There is only one way to become champion. Never. Lose.</p>
      <p>blood rains down from an angry sky! my cock rages on! my cock rages on!</p>
      <p>Greed is but a word jealous men inflict upon the ambitious.</p>
      <p>I am for wine! And the embrace of questionable women!</p>


      <div className='landingLinks'>
        {options.map((item, i) => (
          <div key={i}>
            <LandingLink setTitle={setTitle} path={item.path} name={item.name} resetWorkout={resetWorkout} />
          </div>
        ))}
      </div>


    </m.div>
  )
}

export default WorkoutComplete

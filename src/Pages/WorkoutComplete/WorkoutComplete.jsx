import React, { useState, useEffect } from 'react';
import { motion as m } from 'framer-motion';
import './WorkoutComplete.css';

import LandingLink from '../../Components/LandingLink';

const WorkoutComplete = ({ setTitle, resetWorkout }) => {

  const options = [
    { path: '/spartacus', name: 'For Glory' },
    { path: '/', name: 'Gratitude' }
  ];

  const [quote, setQuote] = useState('');
  const quotes = [
    'There is only one way to become champion. Never. Lose.',
    // 'Blood rains down from an angry sky! My cock rages on! My cock rages on!',
    'Greed is but a word jealous men inflict upon the ambitious.',
    // 'I am for wine, And the embrace of questionable women!',
    // 'A man who so terrifies Jupiter the clouds burst and the Heavens weep.',
    // 'A man must accept his fate, or be destroyed by it',
    'One day, we will see proper reward for all we have done.',
  ];

  function generateRandomQuote(max) {
    const position = Math.floor(Math.random() * max);
    setQuote(quotes[position]);
  }

  useEffect(() => {
    generateRandomQuote(quotes.length);
  }, []);

  return (
    <m.div
      className='workoutComplete'
      key={'/custom'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >

      <div className='completeTitle'>
        <p>WORKOUT COMPLETE</p>
      </div>
      <div className='completeQuote'>
        <p>{quote}</p>
      </div>

      <div className='landingLinks'>
        {options.map((item, i) => (
          <div className='fontAdjust' key={i}>
            <LandingLink setTitle={setTitle} path={item.path} name={item.name} resetWorkout={resetWorkout} />
          </div>
        ))}
      </div>


    </m.div>
  )
}

export default WorkoutComplete

import React from 'react';
import './LandingPage.css';
import { motion as m } from 'framer-motion';

import LandingLink from '../../Components/LandingLink';



const LandingPage = ({ 
  setTitle,
  spartacusWorkout, customWorkout,
  setExerciseList,
  setRestTime, setWorkTime,
  setCustomEdit,
  resetWorkout
}) => {


  // pathways for navigation component
  const titles = [
    { path: '/stopwatch', name: 'StopWatch' },
    { path: '/spartacus', name: 'Spartacus' },
    { path: '/custom', name: 'Custom' }
  ];


  return (
    <m.div 
      className='landingPage'
      key={'/landing'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >

      <div className='landingLinks'>
        {titles.map((item, i) => (
          <LandingLink 
            key={i}
            setExerciseList={setExerciseList}
            setTitle={setTitle} path={item.path} name={item.name} 
            spartacusWorkout={spartacusWorkout} customWorkout={customWorkout}
            setWorkTime={setWorkTime} setRestTime={setRestTime}
            setCustomEdit={setCustomEdit}
            resetWorkout={resetWorkout}
          />
        ))}
      </div>

    </m.div>
  )
}






export default LandingPage

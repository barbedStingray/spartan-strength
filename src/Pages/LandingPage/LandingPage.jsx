import React from 'react';
import './LandingPage.css';

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
    <div className='landingPage'>

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

    </div>
  )
}






export default LandingPage

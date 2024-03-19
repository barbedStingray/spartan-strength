import React from 'react';
import './WorkoutComplete.css';
import LandingLink from '../../Components/LandingLink';

const WorkoutComplete = ({setTitle}) => {

  setTitle('Victory');

  const options = [
    { path: '/', name: 'Welcome' },
    { path: '/spartacus', name: 'Repeat Glory' }
  ];


  return (
    <div className='workoutComplete'>
      <h1>WORKOUT COMPLETE</h1>
      <p>There is only one way to become champion. Never. Lose.</p>

    
      <div className='landingLinks'>
        {options.map((item) => (
          <LandingLink setTitle={setTitle} path={item.path} name={item.name} />
        ))}
      </div>

    
    </div>
  )
}

export default WorkoutComplete

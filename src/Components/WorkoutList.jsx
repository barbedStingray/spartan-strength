import React from 'react';

const WorkoutList = ({ position, dbWorkout }) => {

  return (
    <div className='workoutList'>
      {dbWorkout.map((exercise, i) => (
        <div key={i}
          className={position > i ? 'exercise exerciseComplete' : 'exercise'}
        >
          <p>{exercise.exercise}</p>
        </div>
      ))}
    </div>
  )
}

export default WorkoutList

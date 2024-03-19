import React from 'react'

const WorkoutList = ({ workout, position }) => {
  return (
    <div className='workoutList'>
    {workout.map((exercise, i) => (
      <div key={i} className={position > i ? 'exercise exerciseComplete' : 'exercise'}>
        <p>{exercise}</p>
      </div>
    ))}
  </div>
)
}

export default WorkoutList

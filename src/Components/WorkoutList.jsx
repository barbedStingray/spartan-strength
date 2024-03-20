import React from 'react'

const WorkoutList = ({
  workout, position,
  customEdit, setCustomWorkout,
  customWorkout
}) => {


  function deleteExercise(spot, array) {
    const newArray = [...array]; // copy original array
    newArray.splice(spot, 1);
    setCustomWorkout(newArray);
  }

  return (
    <div className='workoutList'>
      {workout.map((exercise, i) => (
        <div key={i} className={position > i ? 'exercise exerciseComplete' : 'exercise'}>
          <p>{exercise}</p>
          {customEdit ? <div className='clickableDiv' onClick={() => deleteExercise(i, customWorkout)}>X</div> : <></>}
        </div>
      ))}
    </div>
  )
}

export default WorkoutList

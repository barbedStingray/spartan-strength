import React from 'react';

const WorkoutList = ({
  workout, position,
  customEdit, setCustomWorkout,
  customWorkout
}) => {

  function deleteExercise(spot, array) {
    const newArray = [...array];
    newArray.splice(spot, 1);
    setCustomWorkout(newArray);
  }
  function doNothing(){
    console.log('I do nothing');
  }

  return (
    <div className='workoutList'>
      {workout.map((exercise, i) => (
        <div key={i}
          className={position > i ? 'exercise exerciseComplete' : 'exercise'}
          onClick={customEdit ? () => deleteExercise(i, customWorkout) : () => doNothing() }
        >
          <p>{exercise}</p>
        </div>
      ))}
    </div>
  )
}

export default WorkoutList

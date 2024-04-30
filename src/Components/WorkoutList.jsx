import React from 'react';

const WorkoutList = ({
  position, dbSpartacus
}) => {
  console.log('dbSpartacus', dbSpartacus);

  // function deleteExercise(spot, array) {
  //   const newArray = [...array];
  //   newArray.splice(spot, 1);
  //   setCustomWorkout(newArray);
  // }
  // function doNothing(){
  //   console.log('I do nothing');
  // }

  return (
    <div className='workoutList'>
      {dbSpartacus.map((exercise, i) => (
        <div key={i}
          className={i > exercise.id ? 'exercise exerciseComplete' : 'exercise'}
          // onClick={customEdit ? () => deleteExercise(i, customWorkout) : () => doNothing() }
        >
          <p>{exercise.exercise}</p>
        </div>
      ))}
    </div>
  )
}

export default WorkoutList

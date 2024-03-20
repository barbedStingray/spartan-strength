import React from 'react';
import { Link } from 'react-router-dom';

const LandingLink = ({
  setTitle, path, name,
  spartacusWorkout, customWorkout,
  setExerciseList,
  setWorkTime, setRestTime,
  setCustomEdit,
  resetWorkout
}) => {


  function resetParameters() {

    resetWorkout(); 
    setTitle(name);

    if ( name === 'Spartacus' ) {
      setExerciseList(spartacusWorkout);
      setWorkTime(60);
      setRestTime(15);
      setCustomEdit(false);
    }
    else if ( name === 'Custom' ) {
      setExerciseList(customWorkout);
      setCustomEdit(true);
    }
    else {
      console.log('not spartacus or custom');
    }
  }


  return (
    <Link to={path}>
      <div className='landLink' onClick={() => resetParameters()}>
        <p className='mobile'>{name}</p>
      </div>
    </Link>
  )
}

export default LandingLink

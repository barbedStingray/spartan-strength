import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Spartacus.css';

import useInterval from '../../Components/useInterval';
import Clock from '../../Components/Clock';
import WorkoutList from '../../Components/WorkoutList';

import sound1 from '../../audio/beep-07a.wav';
import sound0 from '../../audio/beep-09.wav';


const Spartacus = (
  { runTime, setRunTime,
    position, setPosition,
    delay,
    count, setCount,
    circleTime, setCircleTime,
    rest, setRest,
    workTime, setWorkTime,
    restTime, setRestTime,
    buttonToggle, setButtonToggle,
    spartacusWorkout
  }) => {

  const navigate = useNavigate();


  function playAudioZero() {
    new Audio(sound0).play();
  }
  function playAudioOne() {
    new Audio(sound1).play();
  }

  useInterval(
    () => {
      if (position === spartacusWorkout.length && rest === false) {
        console.log(`workout complete`);
        // ?? * navigate to workout complete page
        setRunTime(false);
        navigate('/workoutComplete');
      }
      else if (checkCount(count) === true && rest === false) {
        console.log(`rest time!`);
        setRest(!rest);
        setCount(restTime);
        setPosition(position + 1);
        setCircleTime(restTime);
        playAudioZero();
      }
      else if (checkCount(count) === true && rest === true) {
        console.log(`work time!`);
        console.log('position', position);
        setRest(!rest);
        setCount(workTime);
        setCircleTime(workTime);
        playAudioZero();
      }
      else if (count === 3 || count === 2 || count === 1) {
        setCount(count - 1);
        playAudioOne();
      }
      else {
        setCount(count - 1);
      }
    }, runTime ? delay : null);

  // used to check for 0 and switch work/rest
  function checkCount(checking) {
    console.log(`checking the count`, checking);
    if (checking === 0) {
      return true;
    }
    else {
      return false;
    }
  }

  function resetWorkout() {
    console.log(`resetting classic spartacus`);
    // reset your variables back to base mode
    setRunTime(false);
    setButtonToggle(!buttonToggle);
    setPosition(0);
    setCount(0);
    setRest(true);
    setCircleTime(0); // match the count
  }

  function beginWorkout() {
    setCount(10);
    setCircleTime(10);
    setRunTime(!runTime); // begins timer
    setButtonToggle(!buttonToggle);
  }



  return (
    <div className="spartacusWorkout">

      <div className='clockTime'>

        <div className='workoutButtons'>
          {buttonToggle ?
            <>
              <div className='clickableDiv' onClick={() => setRunTime(!runTime)}>{runTime ? 'Pause' : 'Start'}</div>
              <div className='clickableDiv red' onClick={() => resetWorkout()}>Missio</div>
            </>
            :
            <div className='clickableDiv' onClick={() => beginWorkout()}><p>Begin</p></div>
          }
        </div>

        <Clock count={count} rest={rest} circleTime={circleTime} />


        <div className='workoutExercise'>
          <p>{rest ? `Next: ${spartacusWorkout[position]}` : `${spartacusWorkout[position]}`}</p>
        </div>
      </div>

      <WorkoutList workout={spartacusWorkout} position={position} />


    </div>
  )
}

export default Spartacus

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion as m } from 'framer-motion';
import './Spartacus.css';

import useInterval from '../../Components/useInterval';
import Clock from '../../Components/Clock';
import WorkoutList from '../../Components/WorkoutList';

import sound1 from '../../audio/beep-07a.wav';
import sound0 from '../../audio/beep-09.wav';


const Spartacus = (
  { masterWorkout,
    workTime, restTime,
    setTitle
  }) => {

  const navigate = useNavigate();

  const [dbWorkout, setdbWorkout] = useState([]);
  const [buttonToggle, setButtonToggle] = useState(false); // button display
  const [rest, setRest] = useState(true); // resting vs working toggle
  const [circleTime, setCircleTime] = useState(0); // sets total circle time for timer
  const [runTime, setRunTime] = useState(false); // starts/stops timer
  const [position, setPosition] = useState(0); // position within the workout
  const [delay] = useState(1000); // delay triggers useEffect 
  const [count, setCount] = useState(0); // universal counter




  // write a conditional for which exercise to request // NUMBER REQEUST 
  function getDataBaseWorkout() {
    // console.log('getting workout from database');
    if (masterWorkout === '0') {
      axios.get('/api/exercise/spartacus').then((response) => {
        // console.log('GET spartacus response:', response.data);
        setdbWorkout(response.data)
      }).catch((error) => {
        console.log('GET error in spartacus');
      });
    }
    else {
      // console.log('loading custom workout', masterWorkout);
      axios.get(`/api/exercise/exercises/${masterWorkout}`).then((response) => {
        // console.log('GET exercises response:', response.data);
        setdbWorkout(response.data);
      }).catch((error) => {
        console.log('GET error in exercises');
      });
    }
  }

  useEffect(() => {
    getDataBaseWorkout();
  }, []);

  function playAudioZero() {
    new Audio(sound0).play();
  }
  function playAudioOne() {
    new Audio(sound1).play();
  }

  useInterval(
    () => {
      if (position === dbWorkout.length && rest === false) {
        resetWorkout();
        setTitle('Victory');
        navigate('/workoutComplete');
      }
      else if (checkCount(count) === true && rest === false) {
        setRest(!rest);
        setCount(restTime);
        setPosition(position + 1);
        setCircleTime(restTime);
        playAudioZero();
      }
      else if (checkCount(count) === true && rest === true) {
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
    if (checking === 0) {
      return true;
    }
    else {
      return false;
    }
  }
  function beginWorkout() {
    setCount(15);
    setCircleTime(15);
    setRunTime(!runTime);
    setButtonToggle(!buttonToggle);
  }

  function resetWorkout() {
    // reset your variables back to base mode
    setRunTime(false);
    setButtonToggle(false);
    setPosition(0);
    setCount(0);
    setRest(true);
    setCircleTime(0); // match the count
  }


  function exerciseDisplay() {
    if (runTime === false) {
      return <p>Prepare Yourself</p>
    }
    else if (position < dbWorkout.length) {
      return <p>{rest ? `Next: ${dbWorkout[position].exercise}` : `${dbWorkout[position].exercise}`}</p>
    }
    else if (position === dbWorkout.length) {
      return <p>Workout Complete</p>
    }
    else {
      console.log('something weird happened');
    }
  }


  return (
    <m.div
      className="spartacusWorkout"
      key={'/spartacus'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >

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
          {exerciseDisplay()}
        </div>
      </div>

      <WorkoutList dbWorkout={dbWorkout} position={position} />

    </m.div>
  )
}

export default Spartacus

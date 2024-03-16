import React, { useState } from 'react';

import './Spartacus.css';

import useInterval from '../../Components/useInterval';

const Spartacus = () => {

  // classic spartacus exercise list
  const spartacusWorkout = [
    // 'Warm Up',
    'Goblet Squats',
    'Mtn. Climbers',
    'Kettle Swings',
    'T Push Ups',
    'Jumping Lunges',
    'Rows',
    'Side Lunges',
    'Renegade Rows',
    'Lunge Twists',
    'Military Press',
  ];

  const [runTime, setRunTime] = useState(false);
  const [position, setPosition] = useState(0); // position within the workout
  const [delay] = useState(1000); // delay triggers useEffect
  const [count, setCount] = useState(0); // universal counter
  const [circleTime, setCircleTime] = useState(0); // sets total circle time for timer

  const [rest, setRest] = useState(true);
  const [workTime, setWorkTime] = useState(3); // workout time 60s
  const [restTime, setRestTime] = useState(5); // rest time 15s
  const [buttonToggle, setButtonToggle] = useState(false); // button display

  // circle gradient colors
  const redOne = '#460101';
  const redTwo = '#8b0000';
  const redThree = '#ffc0cb';
  const blueOne = '#00008b';
  const blueTwo = '#0000ff';
  const blueThree = '#87ceeb';



  useInterval(
    () => {
      if (position === spartacusWorkout.length && rest === false) {
        console.log(`workout complete`);
        setRunTime(false);
        // setCount('WorkoutComplete');
      }
      else if (checkCount(count) === true && rest === false) {
        console.log(`rest time!`);
        setRest(!rest);
        setCount(restTime);
        setPosition(position + 1);
        setCircleTime(restTime);
      }
      else if (checkCount(count) === true && rest === true) {
        console.log(`work time!`);
        console.log('position', position);
        setRest(!rest);
        setCount(workTime);
        setCircleTime(workTime);
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
              <button onClick={() => setRunTime(!runTime)}>{runTime ? 'Pause' : 'Start'}</button>
              <button onClick={() => resetWorkout()}>Give Up</button>
            </>
            :
            <button onClick={() => beginWorkout()}>Begin Workout</button>
          }
        </div>

        <div className='circleContainer'>
          <h4 className='count'>{count}</h4>
          <svg
            className='circle'
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 122.88 122.88"
            // x="0px" y="0px"
            fill={'green'}
            strokeLinecap='round'
          >
            <defs>
              <linearGradient id='gradientColor' gradientTransform='rotate(90)'>
                <stop offset='0%'
                  stopColor={rest ? blueOne : redOne} />
                <stop offset='60%'
                  stopColor={rest ? blueTwo : redTwo} />
                <stop offset='100%'
                  stopColor={rest ? blueThree : redThree} />
              </linearGradient>
            </defs>

            <circle
              cx="61.44"
              cy="61.44"
              r="55"
              // 2pir circumference of a circle based on Radius (r) 2pi(55) = 345.6
              fill="none"
              stroke="url(#gradientColor)"
              strokeDasharray="345.6"
              // possible switch statement? 
              strokeDashoffset={(345.6 * (circleTime - count)) / circleTime} // Adjust according to your countdown
              transform="rotate(-90 61.44 61.44)"
            />
            <path
              d="M61.438,0c33.93,0,61.441,27.512,61.441,61.441 c0,33.929-27.512,61.438-61.441,61.438C27.512,122.88,0,95.37,0,61.441C0,27.512,27.512,0,61.438,0L61.438,0z"
            >
            </path>
          </svg>
        </div>

        <div className='workoutExercise'>
          <p>{rest ? `Next: ${spartacusWorkout[position]}` : `${spartacusWorkout[position]}`}</p>
        </div>
      </div>

      <div className='workoutList'>
        {spartacusWorkout.map((exercise, i) => (
          <div key={i} className={position > i ? 'exercise exerciseComplete' : 'exercise'}>
            <h5>{exercise}</h5>
          </div>
        ))}
      </div>


    </div>
  )
}

export default Spartacus

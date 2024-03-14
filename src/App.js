import './App.css';
import { useEffect, useState, useRef } from 'react';

// import useInterval from './components/useInterval';


function App() {

  // classic spartacus exercise list
  const spartacusWorkout = [
    'Goblet Squats',
    'Mountain Climbers',
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
  const [position, setPosition] = useState(0);
  const [delay] = useState(1000);
  const [count, setCount] = useState(2);

  const [rest, setRest] = useState(true);
  const [workTime, setWorkTime] = useState(3);
  const [restTime, setRestTime] = useState(6);



  useInterval(
    () => {

      if (runTime === true) {
        // console.log(`test`);

        if (checkCount(count) === true && rest === false) {
          console.log(`rest time!`);
          setRest(!rest);
          setCount(restTime);
        }
        else if (checkCount(count) === true && rest === true) {
          console.log(`work time!`);
          setRest(!rest);
          setCount(workTime);
        }
        else {
          setCount(count - 1);
        }
        // setCount(count - 1);
        // console.log(`timer is on`);
      }
      else {
        console.log(`timer is off`);
      }
      // setCount(count + 1);
    }, runTime ? delay : null);


  function checkCount(checking) {
    console.log(`checking the count`, checking);
    if (checking === 0) {
      return true;
    }
    else {
      return false
    }
  }





  // ! useInterval
  // props will be  the callback and delay
  function useInterval(callback, delay) {
    console.log(`BEGIN useInterval`);

    const savedCallback = useRef();

    // Remember the last Callback
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // set up interval
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };





  return (
    <div className="spartanStrength">
      <h1>Spartan Strength</h1>
      <p>Time Clock</p>
      <p>{count}</p>
      {JSON.stringify(rest)}
      {rest ? <p>resting</p> : <p>working</p>}
      <br />
      <button onClick={() => setRunTime(!runTime)}>Start/Stop</button>

    </div>
  );
}

export default App;


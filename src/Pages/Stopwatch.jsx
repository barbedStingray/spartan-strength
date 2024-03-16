import React, { useState } from 'react';
import useInterval from '../Components/useInterval';


const Stopwatch = () => {

    const [runTime, setRunTime] = useState(false);
    const [delay] = useState(1000);
    const [count, setCount] = useState(0);
  
    
    useInterval(
        () => {
            setCount(count + 1);
        }, runTime ? delay : null);


    return (
        <div className="stopWatch">
            <h1>StopWatch Page</h1>
            <p>Time Clock</p>
            <p>{count}</p>
            <button onClick={() => setRunTime(!runTime)}>Start/Stop</button>
            <button onClick={() => setCount(0)}>Reset</button>

        </div>
    )
}

export default Stopwatch

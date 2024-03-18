import React, { useState } from 'react';
import useInterval from '../../Components/useInterval';
import './Stopwatch.css';



const Stopwatch = () => {

    // run time variables
    const [runTime, setRunTime] = useState(false);
    const [delay] = useState(1000);
    const [count, setCount] = useState(0);

    // time clock display
    const hours = Math.floor(count / (1000 * 60 * 60));
    const minutes = Math.floor((count % (1000 * 60 * 60)) / (1000 * 60) * 1000);
    const seconds = Math.floor(count % 60);

    const [laps, setLaps] = useState([]);
    console.log('laps', laps);

    function timerReset() {
        setCount(0);
        setLaps([]);
        setRunTime(false);
    }
    function addLap() {
        // console.log(`adding a lap`, seconds, minutes, hours);
        const theLap = { seconds, minutes, hours }
        setLaps([...laps, theLap]);
        console.log('LAPS', laps);
    }

    function deleteLap(spot, array) {
        console.log('spot', spot);
        console.log('array', array);
        const newArray = [...array]; // copy original array
        newArray.splice(spot, 1);
        console.log(`newArray`, newArray);
        setLaps(newArray);
    }

    useInterval(
        () => {
            setCount(count + 1);
        }, runTime ? delay : null);


    return (
        <div className="stopWatch">

            <div className='timeClock'>
                <div>
                    <p>Hour</p>
                    <p>{hours}</p>
                </div>
                <div>
                    <p>Min</p>
                    <p>{minutes}</p>
                </div>
                <div>
                    <p>Sec</p>
                    <p>{seconds}</p>
                </div>
            </div>

            <div className='watchButtons'>
                <div className='clickableDiv' onClick={() => setRunTime(!runTime)}>{runTime ? 'Pause' : 'Start'}</div>
                <div className='clickableDiv' onClick={() => timerReset()}>Reset</div>
                <div className='clickableDiv' onClick={() => addLap()}>Lap</div>
            </div>

            <div className='lapLog'>
                {laps.length === 0 ? null :
                    laps.map((lap, i) => (
                        <div className='lap' key={i}>
                            <p>Lap {i + 1}: {lap.hours}h {lap.minutes}m {lap.seconds}s</p>
                            <div onClick={() => deleteLap(i, laps)} className='deleteButton'>X</div>
                        </div>
                    ))
                }
            </div>


        </div>
    )
}

export default Stopwatch

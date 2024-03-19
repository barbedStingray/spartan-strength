import React, { useState } from 'react';
import './CustomWork.css';
import WorkoutList from '../../Components/WorkoutList';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../../Components/CustomInput';

const CustomWork = (
    {
        workTime, setWorkTime,
        restTime, setRestTime,
        setSpartacusWorkout
    }) => {

    const navigate = useNavigate();

    const [customWorkout, setCustomWorkout] = useState([]);
    const [exercise, setExercise] = useState('');

    const inputBoxes = [
        { value: workTime, ability: setWorkTime, type: 'number', name: 'Work Time'},
        { value: restTime, ability: setRestTime, type: 'number', name: 'Rest Time'},
        { value: exercise, ability: setExercise, type: 'text', name: 'Add New Exercise'}
    ];

    
    function addExercise(exercise) {
        console.log(`adding a new exercise`);
        setCustomWorkout([...customWorkout, exercise]);
        console.log(customWorkout);
        setExercise('');
    }

    function beginCustomWorkout() {
        console.log(`beginning custom workout`);

        // todo logic for incorrect parameters

        setSpartacusWorkout(customWorkout);
        navigate('/spartacus');
    }


    return (
        <div className='spartacusWorkout'>

            <div className='clockTime'>

                {inputBoxes.map((box) => (
                    <CustomInput value={box.value} ability={box.ability} type={box.type} name={box.name} />
                ))}

                <button onClick={() => addExercise(exercise)}>ADD EXERCISE</button>
                
                <button onClick={() => beginCustomWorkout()}>Begin Custom Workout</button>

            </div>
            <WorkoutList workout={customWorkout} />

        </div>
    )
}

export default CustomWork

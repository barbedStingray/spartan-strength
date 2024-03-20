import React, { useState } from 'react';
import './CustomWork.css';
import WorkoutList from '../../Components/WorkoutList';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../../Components/CustomInput';

const CustomWork = ({
    workTime, setWorkTime,
    restTime, setRestTime,
    setCustomWorkout, customWorkout,
    setExerciseList,
    customEdit, setCustomEdit,
    resetWorkout
}) => {

    const navigate = useNavigate();

    const [exercise, setExercise] = useState('');
    const inputBoxes = [
        { value: workTime, ability: setWorkTime, type: 'number', name: 'Work Time' },
        { value: restTime, ability: setRestTime, type: 'number', name: 'Rest Time' },
        { value: exercise, ability: setExercise, type: 'text', name: 'Add New Exercise' }
    ];


    function addExercise(exercise) {
        setCustomWorkout([...customWorkout, exercise]);
        setExercise('');
    }
    function beginCustomWorkout() {
        resetWorkout();
        setExerciseList(customWorkout);
        setCustomEdit(false);
        navigate('/spartacus');
    }



    return (
        <div className='spartacusWorkout'>

            <div className='clockTime'>

                {inputBoxes.map((box, i) => (
                    <div key={i} className='customInput'>
                        <CustomInput value={box.value} ability={box.ability} type={box.type} name={box.name} />
                    </div>
                ))}

                <div className='clickableDiv' onClick={() => addExercise(exercise)}>ADD EXERCISE</div>

                <div className='clickableDiv' onClick={() => beginCustomWorkout()}>Begin Custom Workout</div>

                <div className='clickableDiv' onClick={() => setCustomWorkout([])}>Reset Workout</div>


            </div>
            <WorkoutList workout={customWorkout} customEdit={customEdit} customWorkout={customWorkout} setCustomWorkout={setCustomWorkout} />

        </div>
    )
}

export default CustomWork

import React, { useState } from 'react';
import { motion as m } from 'framer-motion';
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
        { value: exercise, ability: setExercise, type: 'text', name: 'Exercise' }
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
        <m.div
            className='spartacusWorkout'
            key={'/custom'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
        >

            <div className='customInputContainer'>

                <div className='inputBoxes'>
                    {inputBoxes.map((box, i) => (
                        <div key={i} className='customInput'>
                            <CustomInput value={box.value} ability={box.ability} type={box.type} name={box.name} />
                        </div>
                    ))}
                </div>

                <div className='customControl'>
                    <div className='inputButton' onClick={() => addExercise(exercise)}>Add</div>
                    <div className='inputButton' onClick={() => setCustomWorkout([])}>Reset</div>
                </div>

                <div className='inputButton setCustom' onClick={() => beginCustomWorkout()}>Workout Ready</div>


            </div>
            <WorkoutList workout={customWorkout} customEdit={customEdit} customWorkout={customWorkout} setCustomWorkout={setCustomWorkout} />

        </m.div>
    )
}

export default CustomWork

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion as m } from 'framer-motion';
import './CustomWork.css';

import WorkoutList from '../../Components/WorkoutList';
import CustomInput from '../../Components/CustomInput';

const CustomWork = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    // console.log('useParams:', id);


    const [exerciseList, setExerciseList] = useState([]);
    const [exerciseName, setExerciseName] = useState('');
    const [title, setTitle] = useState('');

    async function getWorkoutExercises(id) {
        console.log('getting exercises for workout', id);

        try {
            const exercises = await axios.get(`/api/exercise/exercises/${id}`);
            // console.log('exercises', exercises.data);
            const workoutTitle = await axios.get(`/api/exercise/workoutName/${id}`);
            // console.log('workoutTitle', workoutTitle.data[0].name);
            setExerciseList(exercises.data);
            setTitle(workoutTitle.data[0].name);
        } catch (error) {
            console.log('GET error in loading workout details', error);
        }
    }
    useEffect(() => {
        getWorkoutExercises(id);
    }, []);

    function addNewExercise(e) {
        e.preventDefault();
        console.log('adding new exercise', { id, exerciseName });

        axios.post(`/api/exercise/newExercise`, { id, exerciseName }).then((response) => {
            console.log('POST newExercise response:', response.data);
            getWorkoutExercises(id);
            setExerciseName('');

        }).catch((error) => {
            console.log('POST error /newExercise', error);
        }); 
    }



    return (
        <m.div
            className='customWork'
            key={'/custom'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
        >

            <form onSubmit={(e) => addNewExercise(e)}>
                <input
                    className='inputBox'
                    value={exerciseName} // value will be rest
                    onChange={(e) => setExerciseName(e.target.value)}
                    type='text'
                    placeholder='Exercise Name'
                />
                {JSON.stringify(exerciseName)}
                <button type='submit'>Add</button>
            </form>

            <p>{title}</p>

            {exerciseList.map((exercise) => (
                <div key={exercise.id}>
                    <p>{exercise.exercise}</p>
                    <button>DELETE</button>
                    <button>EDIT</button>
                </div>
            ))}

            {/* {JSON.stringify(exerciseList)} */}


            <Link to={'/select'}>
                <div
                    className='inputButton setCustom'
                // onClick={() => editWorkout(masterWorkout)}
                >
                    <p>Back</p>
                </div>
            </Link>






        </m.div>
    )
}

export default CustomWork

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { motion as m } from 'framer-motion';
import './CustomWork.css';

import Exercise from '../../Components/Exercise';


const CustomWork = () => {

    const { id } = useParams();

    const [exerciseList, setExerciseList] = useState([]);
    const [exerciseName, setExerciseName] = useState('');
    const [title, setTitle] = useState('');

    async function getWorkoutExercises(id) {
        // console.log('getting exercises for workout', id);
        try {
            const exercises = await axios.get(`/api/exercise/exercises/${id}`);
            console.log('exercises', exercises.data);
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


    // save changes - deletes old, posts new array of changes
    // just saves the order of exercises
    async function saveWorkoutExerciseChanges(id) {
        console.log('saving new workout changes', id);
        console.log('new workout Array', exerciseList);

        try {
            await axios.delete(`/api/exercise/clearAll/${id}`);
            console.log('delete success');
            await axios.post(`/api/exercise/updateWorkout`, { id, exerciseList });
            console.log('success in Save Changes');
            getWorkoutExercises(id);

        } catch (error) {
            console.log('saveChanges ERROR', error);
        }
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
                    value={exerciseName}
                    onChange={(e) => setExerciseName(e.target.value)}
                    type='text'
                    placeholder='Exercise Name'
                />
                {JSON.stringify(exerciseName)}
                <button type='submit'>Add</button>
            </form>

            <p>{title}</p>

            {exerciseList.map((exercise) => (
                <Exercise 
                    key={exercise.id}
                    id={id}
                    exercise={exercise} 
                    getWorkoutExercises={getWorkoutExercises}
                    exerciseList={exerciseList}
                    setExerciseList={setExerciseList}
                />
            ))}

            <Link to={'/select'}>
                <div
                    className='inputButton setCustom'
                // onClick={() => editWorkout(masterWorkout)}
                >
                    <p>Back</p>
                </div>
            </Link>

            <div
                className='inputButton setCustom'
                onClick={() => saveWorkoutExerciseChanges(id)}
            >
                <p>Save Changes</p>
            </div>

            {JSON.stringify(exerciseList)}

        </m.div>
    )
}

export default CustomWork

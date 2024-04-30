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

    function deleteExercise(exercise) {
        console.log('deleting exercise', exercise);

        axios.delete(`/api/exercise/deleteExercise/${exercise}`).then((response) => {
            console.log('/deleteExercise success');
            getWorkoutExercises(id);
        }).catch((error) => {
            console.log('DELETE /deleteExercise', error);
        });
    }

    function deleteWorkout(id) {
        console.log('deleting entire workout', id);

        axios.delete(`/api/exercise/deleteWorkout/${id}`).then((response) => {
            console.log('/deleteWorkout success');
            navigate('/select');
            // ?? Set the masterWorkout Number again? 

        }).catch((error) => {
            console.log('/deleteExercise ERROR', error);
        });
    }

    function moveExerciseBackward(exerciseID) {
        // console.log('move exercise down in list', exerciseID);
        const index = exerciseList.findIndex((item) => item.id === exerciseID);
        // console.log('INDEX', index);

        if (index === -1 || index === exerciseList.length - 1) {
            // console.log('cannot move object down');
            return;
        } else {
            // console.log('BACKWARDS');
            const newArray = [...exerciseList];
            const objectShift = newArray.splice(index, 1)[0];
            // console.log('ObjectShift', objectShift);
            newArray.splice(index + 1, 0, objectShift);
            // console.log('FINAL', newArray);
            setExerciseList(newArray);
        }
    }
    function moveExerciseForward(exerciseID) {
        // console.log('move exercise up in list', exerciseID);

        const index = exerciseList.findIndex((item) => item.id === exerciseID);
        // console.log('INDEX', index);

        if (index === -1 || index === 0) {
            // console.log('cannot move object up');
            return;
        } else {
            // console.log('FORWARDS');
            const newArray = [...exerciseList];
            const objectShift = newArray.splice(index, 1)[0];
            // console.log('ObjectShift', objectShift);
            newArray.splice(index - 1, 0, objectShift);
            // console.log('FINAL', newArray);
            setExerciseList(newArray);
        }
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
                    <button onClick={() => deleteExercise(exercise.id)}>DELETE</button>
                    <button onClick={() => moveExerciseForward(exercise.id)}>UP</button>
                    <button onClick={() => moveExerciseBackward(exercise.id)}>DOWN</button>
                </div>
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
                onClick={() => deleteWorkout(id)}
            >
                <p>Delete Workout</p>
            </div>

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

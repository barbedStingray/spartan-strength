import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion as m } from 'framer-motion';

import WorkoutList from '../../Components/WorkoutList';

import './SelectWorkout.css';


const SelectWorkout = ({
    masterWorkout, setMasterWorkout,
    workTime, setWorkTime,
    restTime, setRestTime
}) => {

    const navigate = useNavigate();

    const [workoutsList, setWorkoutsList] = useState([]);
    const [exerciseList, setExerciseList] = useState([]);
    const [workoutName, setWorkoutName] = useState('');


    function getPersonalWorkoutList() {
        console.log('getting workout list');

        axios.get('/api/exercise/workoutsList').then((response) => {
            console.log('GET spartacus response:', response.data);
            setWorkoutsList(response.data);
        }).catch((error) => {
            console.log('GET error in spartacus');
        });
    }
    useEffect(() => {
        getPersonalWorkoutList();
    }, []);

    function displayExerciseList(id) {
        console.log('getting exercises', id);

        axios.get(`/api/exercise/exercises/${id}`).then((response) => {
            console.log('GET exercises response:', response.data);
            setExerciseList(response.data);
        }).catch((error) => {
            console.log('GET error in exercises');
        });
    }
    useEffect(() => {
        displayExerciseList(masterWorkout);
    }, [masterWorkout]);

    function beginCustomWorkout() {
        console.log('beginning custom workout');
        // ?? set other parameters
        navigate('/spartacus');
    }

    function createNewWorkout() {
        // console.log('creating new workout', workoutName);

        if (!validateInput(workoutName)) {
            alert('Please Name Your Workout');
            return;
        }

        axios.post(`/api/exercise/newWorkout`, { workoutName }).then((response) => {
            console.log('POST newWorkout response:', response.data);
            getPersonalWorkoutList(); // regenerate list
            setMasterWorkout(`${response.data.id}`); // set dropdown menu
            console.log('masterWorkout', setMasterWorkout);
            setWorkoutName(''); // clear input field

        }).catch((error) => {
            console.log('POST error /newWorkout', error);
        });
    }

    function editWorkout(id) {
        // console.log('editing workout', id);
        if (!validateWorkout(id)) {
            alert('Please Select a Workout to Edit');
            return;
        }
        navigate(`/custom/${id}`);
    }

    function deleteWorkout(id) {
        console.log('deleting entire workout', id);

        if (!validateWorkout(id)) {
            alert('Please Select a Workout to Delete');
            return;
        }

        axios.delete(`/api/exercise/deleteWorkout/${id}`).then((response) => {
            console.log('/deleteWorkout success');
            // ? will this work? 
            setExerciseList([]);
            setMasterWorkout('0');
            getPersonalWorkoutList();

        }).catch((error) => {
            console.log('/deleteExercise ERROR', error);
        });
    }

    function validateInput(string) {
        // console.log('string.length', string.length);
        if (string.length === 0) {
            return false;
        } else {
            return true;
        }
    }
    function validateWorkout(workout) {
        // console.log('workoutNumber', workout);
        if (workout === '0') {
            return false;
        } else {
            return true;
        }
    }




    return (
        <m.div
            className='selectWorkoutPage'
            key={'/select'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
        >




            <div className='leftSide'>

                <div className='workAndRest'>
                    <div className='workRest'>
                        <div className='workRestTitle'>
                            <p>Work:</p>
                        </div>
                        <div className='workRestInput'>
                            <input
                                className='timeInput'
                                value={workTime} // value will be workTime
                                onChange={(e) => setWorkTime(e.target.value)}
                                type='number'
                                placeholder='work'
                            />
                        </div>
                    </div>
                    <div className='workRest'>
                        <div className='workRestTitle'>
                            <p>Rest:</p>
                        </div>
                        <div className='workRestInput'>
                            <input
                                className='timeInput'
                                value={restTime} // value will be rest
                                onChange={(e) => setRestTime(e.target.value)}
                                type='number'
                                placeholder='Rest'
                            />
                        </div>
                    </div>
                </div>

                <div className='selectInputWorkout'>
                    <select
                        className='workoutSelect'
                        onChange={(e) => setMasterWorkout(e.target.value)}
                        value={masterWorkout}
                    >
                        <option value={0}>Select One...</option>
                        {workoutsList.map((workout) => (
                            <option
                                key={workout.id}
                                value={workout.id}
                            >
                                {workout.name}
                            </option>
                        ))}
                    </select>

                </div>
                <div className='exerciseScroll'>
                    <div className='selectExerciseList'>
                        {exerciseList.map((exercise) => (
                            <p key={exercise.id}>{exercise.exercise}</p>
                        ))}
                    </div>
                    {/* <WorkoutList dbWorkout={exerciseList} /> */}
                </div>

            </div>




            <div className='rightSide'>


                <div
                    className='selectButton'
                    onClick={beginCustomWorkout}
                >
                    <p>Begin Workout</p>
                </div>

                <div className='createWorkout'>
                    <input
                        className='newWorkoutName'
                        value={workoutName}
                        onChange={(e) => setWorkoutName(e.target.value)}
                        type='text'
                        placeholder='Workout Name'
                    />

                    <div
                        className='selectButton'
                        onClick={createNewWorkout}
                    ><p>Create</p></div>
                </div>

                <div
                    className='selectButton'
                    onClick={() => editWorkout(masterWorkout)}
                ><p>Edit</p></div>

                <div
                    className='selectButton'
                    onClick={() => deleteWorkout(masterWorkout)}
                ><p>Delete</p></div>

            </div>


        </m.div >
    )
}

export default SelectWorkout

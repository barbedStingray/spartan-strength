import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion as m } from 'framer-motion';


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
        console.log('creating new workout', workoutName);

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
        console.log('editing workout', id);
        navigate(`/custom/${id}`);
    }

    function deleteWorkout(id) {
        console.log('deleting entire workout', id);

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




    return (
        <m.div
            className='selectWorkout'
            key={'/select'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
        >

            <p>This is the Select Workout Page</p>
            <input
                className='inputBox'
                value={workTime} // value will be workTime
                onChange={(e) => setWorkTime(e.target.value)}
                type='text'
                placeholder='work'
            />
            <input
                className='inputBox'
                value={restTime} // value will be rest
                onChange={(e) => setRestTime(e.target.value)}
                type='text'
                placeholder='Rest'
            />
            <br />
            {JSON.stringify(workoutsList)}
            <br />
            {JSON.stringify(exerciseList)}
            <br />


            <select
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
            {JSON.stringify(masterWorkout)}

            <div
                className='inputButton setCustom'
                onClick={beginCustomWorkout}
            >
                <p>Begin Workout</p>
            </div>

            <input
                className='inputBox'
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                type='text'
                placeholder='Workout Name'
            />
            {JSON.stringify(workoutName)}

            <div
                className='inputButton setCustom'
                onClick={createNewWorkout}
            >
                <p>New Workout</p>
            </div>

            <div
                className='inputButton setCustom'
                onClick={() => editWorkout(masterWorkout)}
            >
                <p>Edit Workout</p>
            </div>

            <div
                className='inputButton setCustom'
                onClick={() => deleteWorkout(masterWorkout)}
            >
                <p>Delete Workout</p>
            </div>
        </m.div >
    )
}

export default SelectWorkout

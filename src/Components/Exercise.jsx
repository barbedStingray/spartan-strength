import React, { useState } from 'react';
import axios from 'axios';
import { motion as m, useIsPresent } from 'framer-motion';


import { GiBackstab } from "react-icons/gi";
import { GiThrownSpear } from "react-icons/gi";
import { GiShieldBounces } from "react-icons/gi";



const Exercise = ({
    id, exercise, getWorkoutExercises,
    exerciseList, setExerciseList
}) => {

    const [editToggle, setEditToggle] = useState(false);
    const [exerciseEdit, setExerciseEdit] = useState(exercise.exercise);
    const isPresent = useIsPresent();



    function deleteExercise(exercise) {
        console.log('deleting exercise', exercise);

        axios.delete(`/api/exercise/deleteExercise/${exercise}`).then((response) => {
            console.log('/deleteExercise success');
            getWorkoutExercises(id);
        }).catch((error) => {
            console.log('DELETE /deleteExercise', error);
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

    function editExercise() {
        setEditToggle(!editToggle);
    }

    function saveEdits(exercise, newName) {
        console.log('editing exercise', exercise, newName);

        axios.put(`/api/exercise/editExercise/${exercise}`, { newName }).then((response) => {
            console.log('/editExercise success');
            getWorkoutExercises(id);
            setEditToggle(!editToggle);
        }).catch((error) => {
            console.log('PUT /editExercise ERROR', error);
        });
    }


    const animations = {
        // style: {
        //     position: isPresent ? 'static' : 'absolute'
        // },
        initial: { scale: 0 },
        animate: { scale: 1 },
        exit: { scale: 0, position: 'absolute' },
        transition: { type: 'spring', stiffness: 500, damping: 50 }
    }



    return (
        <m.div
            {...animations}
            className='editExercise'
            key={exercise.id}
        >
            <div className='exerciseName'>
                {editToggle ?
                    <>
                        <input
                            className='customEdit'
                            type='text'
                            value={exerciseEdit}
                            onChange={(e) => setExerciseEdit(e.target.value)}
                            placeholder='Edit Exercise'
                        />
                    </>
                    :
                    <p>{exercise.exercise}</p>
                }
            </div>

            <div className='editOptionBar'>
                {editToggle ?
                    <div className='alteringExercises'>
                        {/* <button onClick={() => saveEdits(exercise.id, exerciseEdit)}>Save</button> */}
                        <div className='option' onClick={() => deleteExercise(exercise.id)}><GiBackstab /></div>
                        <div className='option reverse' onClick={() => moveExerciseForward(exercise.id)}><GiThrownSpear /></div>
                        <div className='option' onClick={() => moveExerciseBackward(exercise.id)}><GiThrownSpear /></div>
                        <div className='option' onClick={() => editExercise()}><GiShieldBounces /></div>
                    </div>
                    :
                    <div className='editingExercises'>
                        <div className='option' onClick={() => editExercise()}><GiShieldBounces /></div>
                        {/* <button onClick={() => deleteExercise(exercise.id)}>DELETE</button> */}
                        {/* <button onClick={() => moveExerciseForward(exercise.id)}>UP</button> */}
                        {/* <button onClick={() => moveExerciseBackward(exercise.id)}>DOWN</button> */}
                        {/* <button onClick={() => editExercise()}>Edit</button> */}
                    </div>
                }
            </div>
        </m.div>
    )
}

export default Exercise

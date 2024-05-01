import React, { useState } from 'react';
import axios from 'axios';

const Exercise = ({
    id, exercise, getWorkoutExercises,
    exerciseList, setExerciseList
}) => {

    const [editToggle, setEditToggle] = useState(false);
    const [exerciseEdit, setExerciseEdit] = useState(exercise.exercise);

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



    return (
        <div key={exercise.id}>
            {editToggle ?
                <>
                    <input
                        type='text'
                        value={exerciseEdit}
                        onChange={(e) => setExerciseEdit(e.target.value)}
                        placeholder='Edit Exercise'
                    />
                    {JSON.stringify(exerciseEdit)}
                </>
                :
                <p>{exercise.exercise}</p>
            }
            <p>{exercise.exercise}</p>
            <button onClick={() => deleteExercise(exercise.id)}>DELETE</button>
            <button onClick={() => moveExerciseForward(exercise.id)}>UP</button>
            <button onClick={() => moveExerciseBackward(exercise.id)}>DOWN</button>
            {editToggle ?
                <>
                    <button onClick={() => saveEdits(exercise.id, exerciseEdit)}>Save</button>
                    <button onClick={() => editExercise()}>X</button>
                </>
                :
                <button onClick={() => editExercise()}>Edit</button>
            }
        </div>
    )
}

export default Exercise

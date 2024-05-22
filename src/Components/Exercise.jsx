import React, { useState } from 'react';
// import axios from 'axios';
import { motion as m } from 'framer-motion';


import { GiBackstab } from "react-icons/gi";
import { GiThrownSpear } from "react-icons/gi";
// import { GiShieldBounces } from "react-icons/gi";



const Exercise = ({ exercise, exerciseList, setExerciseList, index }) => {

    const [isOpen, setIsOpen] = useState(false);

    const animations = {
        // style: {
        //     position: isPresent ? 'relative' : 'absolute'
        // },
        initial: { scale: 0 },
        animate: { scale: 1 },
        exit: { scale: 0, position: 'static' },
        transition: { type: 'spring', stiffness: 500, damping: 50 }
    }

    function removeExercise(index) {
        // console.log('removing exercise', index);
        // console.log(exerciseList[index]);
        const updatedArray = exerciseList.filter((word, i) => i !== index)
        // console.log('updated Array', updatedArray);
        setExerciseList(updatedArray);
    }

    function moveExerciseUp(index) {
        console.log('moving exercise up', index);

        if (index === -1 || index === 0) {
            console.log('cannot move object up');
            return;
        } else {
            console.log('FORWARDS');
            const newArray = [...exerciseList];
            const objectShift = newArray.splice(index, 1)[0];
            // console.log('ObjectShift', objectShift);
            newArray.splice(index - 1, 0, objectShift);
            // console.log('FINAL', newArray);
            setExerciseList(newArray);
        }
    }

    function moveExerciseDown(index) {
        console.log('moving exercise Down', index);
        if (index === -1 || index === exerciseList.length - 1) {
            console.log('cannot move object down');
            return;
        } else {
            console.log('BACKWARDS');
            const newArray = [...exerciseList];
            const objectShift = newArray.splice(index, 1)[0];
            // console.log('ObjectShift', objectShift);
            newArray.splice(index + 1, 0, objectShift);
            // console.log('FINAL', newArray);
            setExerciseList(newArray);
        }

    }



    return (
        <m.div {...animations} layout className='editExercise'
            onMouseEnter={() => setIsOpen(!isOpen)}
            onMouseLeave={() => setIsOpen(!isOpen)}
        >
            <m.div
                className='exerciseExpand'
                layout
                transition={{ layout: { duration: 1, type: 'spring' } }}
            >
                <m.p className='exerciseName' layout='position' >{exercise}</m.p>

            </m.div>
            {isOpen && (
                <m.div
                    className='editOptionBar'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <button className='option' onClick={() => removeExercise(index)}><GiBackstab /></button>
                    <button className='option reverse' onClick={() => moveExerciseUp(index)}><GiThrownSpear /></button>
                    <button className='option' onClick={() => moveExerciseDown(index)}><GiThrownSpear /></button>
                    {/* <button className='option' onClick={() => editExercise(index)}><GiShieldBounces /></button> */}
                </m.div>
            )}
        </m.div>
    )
}

export default Exercise

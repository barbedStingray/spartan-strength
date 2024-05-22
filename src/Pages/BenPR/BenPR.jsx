import React from 'react';
import { motion as m } from 'framer-motion';
import './BenPR.css';

const BenPR = () => {

    const personalRecord = [
        {
            exercise: 'Goblet Squats',
            record: 63,
            weight: '10lbs'
        },
        {
            exercise: 'Mtn Climbers',
            record: 160,
            weight: 'none'
        },
        {
            exercise: 'Kettle Swings',
            record: 39,
            weight: '20lbs'
        },
        {
            exercise: 'T Push Ups',
            record: 24,
            weight: '10lbs'
        },
        {
            exercise: 'Jumping Lunges',
            record: 67,
            weight: 'none'
        },
        {
            exercise: 'Rows',
            record: 72,
            weight: '10lbs'
        },
        {
            exercise: 'Side Lunges',
            record: 28,
            weight: '20lbs'
        },
        {
            exercise: 'Renegade Rows',
            record: 38,
            weight: '10lbs'
        },
        {
            exercise: 'Lunge Twists',
            record: 28,
            weight: '20lbs'
        },
        {
            exercise: 'Military Press',
            record: 55,
            weight: '10lbs'
        },
    ];


    return (
        <m.div
            className='benPR'
            key={'/custom'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
            <h1>Bens Record</h1>

            <div className='prBoard'>
                {personalRecord.map((record) => (
                    <div className='exerciseRecord'>
                        <p className='recordTitle'>{record.exercise}</p>
                        <div className='recordStats'>
                            <p>{record.record} reps - {record.weight}</p>
                        </div>
                    </div>
                ))}
            </div>
        </m.div>
    )
}

export default BenPR

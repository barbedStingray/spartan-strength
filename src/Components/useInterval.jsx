import React, { useEffect, useRef } from 'react';

export default function useInterval(callback, delay) {
    console.log(`BEGIN useInterval`);

    // preventing a callback from creating infinite loops
    const savedCallback = useRef();

    // Remember the last Callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // set up interval
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};

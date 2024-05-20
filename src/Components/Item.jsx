import React from 'react';
import { motion as m, useIsPresent } from 'framer-motion';

const Item = ({ item }) => {

    const isPresent = useIsPresent();

    const animations = {
        style: {
            position: isPresent ? 'relative' : 'absolute'
        },
        initial: { scale: 0 },
        animate: { scale: 1 },
        exit: { scale: 0, position: 'absolute' },
        transition: { type: 'spring', stiffness: 500, damping: 50 }
    }

    return (
        <div>
            <m.h1 {...animations} layout>{item}</m.h1>
        </div>
    )
}

export default Item

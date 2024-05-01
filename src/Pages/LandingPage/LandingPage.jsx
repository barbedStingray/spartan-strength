import React from 'react';
import { Link } from 'react-router-dom';
import { motion as m } from 'framer-motion';
import './LandingPage.css';


const LandingPage = ({
  setTitle,
  setMasterWorkout,
  setWorkTime, setRestTime
}) => {

  // pathways 
  const titles = [
    { path: '/spartacus', name: 'Spartacus', ability: setClassicSpartacusWorkout },
    { path: '/stopwatch', name: 'StopWatch', ability: setTitle },
    { path: '/select', name: 'Select', ability: setTitle }
  ];

  function setClassicSpartacusWorkout() {
    console.log('setting the classic spartacus workout');
    setMasterWorkout('0');
    setWorkTime(60);
    setRestTime(15);
    setTitle('The Classic');
  }

  return (
    <m.div
      className='landingPage'
      key={'/landing'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >

      <div className='landingLinks'>
        {titles.map((title, i) => (
          <Link to={title.path} key={i}>
            <div onClick={() => title.ability(title.name)}>
              <p>{title.name}</p>
            </div>
          </Link>
        ))}
      </div>

    </m.div>
  )
}

export default LandingPage

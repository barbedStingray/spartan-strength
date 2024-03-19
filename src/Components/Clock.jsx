import React from 'react'

const Clock = ({ count, rest, circleTime }) => {
    

  return (

        <div className='circleContainer'>
          <p className='count'>{count}</p>
          <svg
            className='circle'
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 122.88 122.88"
            // x="0px" y="0px"
            fill={'green'}
            strokeLinecap='round'
          >
            <defs>
              <linearGradient id='gradientColor' gradientTransform='rotate(85)'>
                <stop offset='0%'
                  stopColor={rest ? '#000090' : '#5a0000' } />
                <stop offset='60%'
                  stopColor={rest ? '#0088ff' : '#e10000' } />
                <stop offset='100%'
                  stopColor={rest ? '#87ceeb' : '#dc4545' } />
              </linearGradient>
            </defs>

            <circle
              cx="61.44"
              cy="61.44"
              r="55"
              // 2pir circumference of a circle based on Radius (r) 2pi(55) = 345.6
              fill="none"
              stroke="url(#gradientColor)"
              strokeDasharray="345.6"
              // possible switch statement? 
              strokeDashoffset={(345.6 * (circleTime - count)) / circleTime} // Adjust according to your countdown
              transform="rotate(-90 61.44 61.44)"
            />
            <path
              d="M61.438,0c33.93,0,61.441,27.512,61.441,61.441 c0,33.929-27.512,61.438-61.441,61.438C27.512,122.88,0,95.37,0,61.441C0,27.512,27.512,0,61.438,0L61.438,0z"
            >
            </path>
          </svg>
        </div>
)
}

export default Clock

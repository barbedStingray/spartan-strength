import React from 'react'

const CustomInput = ({ value, ability, type, name }) => {
    return (
        <>
            <p>{name}</p>
            <input
                className='inputBox'
                value={value}
                onChange={(e) => ability(e.target.value)}
                type={type}
                placeholder={name}
            />
        </>
    )
}

export default CustomInput

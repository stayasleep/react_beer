import React from 'react';

export default function renderBeer({className, input, label, type, value}){
    return(
        <input
            className={className}
            checked={true}
            label ={label}
            type={type}
            value={value}
            {...input}
        />
    )
}
import React from 'react';

export default function renderBeer({check,className, input, label, type, value}){
    return(
        <input
            className={className}
            //checked={checked}
            checked={value === check}
            label ={label}
            type={type}
            value={value}
            {...input}
        />
    )
}
import React from 'react';

export default function renderInput({className, input, label, type, val, meta: {active, dirty, touched, error}}){
    return(
        <div>
            <input
                className={className}
                placeholder={label}
                type={type}
                {...input}
            />
            {touched && (error && <span>{error}</span>)}
        </div>
    )
}
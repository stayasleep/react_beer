import React from 'react';
import beertap from '../images/beertap.png';

export default (props) => {
    console.log('props',props);
    function handleClick(){
        props.onClick();
    }
    return(
        <div className="col-md-3 tap-it" style={{background: `url(${beertap}) center center / cover no-repeat`}} onClick={handleClick}>

        </div>
    )
}
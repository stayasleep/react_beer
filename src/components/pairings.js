import React from 'react';

const Pairing =({pair}) => {
    console.log('my pair',pair);
    return(
        <div className="col-md-3">
            {pair.length > 0 &&
            <div className="blackBox">
                {pair[0].foodPairings}
            </div>}
        </div>
    )
};

export default Pairing;
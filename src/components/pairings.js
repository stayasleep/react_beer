import React from 'react';

const Pairing =({pair}) => {
    console.log('my pair',pair);
    return(
        <div>
            {pair.length > 0 &&
            <div>
                {pair[0].foodPairings}
            </div>}
        </div>
    )
};

export default Pairing;
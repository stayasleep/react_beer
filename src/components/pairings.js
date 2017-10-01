import React from 'react';

const Pairing =({pair}) => {
    console.log('my pair',pair);
    return(
        <div className="col-md-4">
            {pair.length > 0 &&
            <div className="black-box">
                <h3>Style: {pair[0].name}</h3>
                <p className="food-rec">Our Recommendation:
                    { pair[0].foodPairings}
                </p>
            </div>}
        </div>
    )
};

export default Pairing;
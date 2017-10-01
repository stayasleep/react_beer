import React from 'react';
import { Col } from 'react-bootstrap';

const Pairing =({pair}) => {
    console.log('my pair',pair);
    return(
        <Col sm={4} smOffset={3} mdOffset={0}>
            {pair.length > 0 &&
            <div className="black-box">
                <h3>Style: {pair[0].name}</h3>
                <p className="food-rec">Our Recommendation:
                    { pair[0].foodPairings}
                </p>
            </div>}
        </Col>
    )
};

export default Pairing;
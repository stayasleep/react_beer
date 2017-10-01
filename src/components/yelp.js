import React from 'react';
import { Col } from 'react-bootstrap';

const Yelp = ({yelp}) =>{
    console.log('my yelp reviews',yelp);
    return(
        <Col sm={6} smOffset={3} mdOffset={2} className="yelp-container">
            <div className="yelp-review-area">
                {yelp.length > 0 && yelp.map((biz,index) =>{
                    return (
                        <div key={index} className="biz-review">
                            <div className="main-attr">
                                <div className="main-img">
                                    <img className="img" src={biz.img} alt={biz.name}/>
                                </div>
                                <div className="main-info">
                                    <h4>{`${index +1}. ${biz.name}`}</h4>
                                    <div className="rating"><img src={biz.rating} alt={`${index+1}-rating`}/></div>
                                </div>
                            </div>
                            <div className="secondary-attr">
                                <div className="secondary-address">
                                    {biz.address}
                                </div>
                                <div className="secondary-add-2">
                                    {`${biz.city}, ${biz.state} ${biz.zip}`}
                                </div>
                                <div className="secondary-phone">
                                    {biz.phone}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Col>
    )
};

export default Yelp;
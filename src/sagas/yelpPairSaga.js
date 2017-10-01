import {put, call} from 'redux-saga/effects';
import {YELP_SUCCESS, PAIRING_SUCCESS} from '../actions/types';
import {callFoodPairings, callYelp} from '../actions/api';

export function* yelpPairSaga({payload}){
    try{
        const businesses = yield call(callYelp, payload);
        const pairing = yield call(callFoodPairings,payload);
        yield[
            put({type: YELP_SUCCESS, businesses}),
            put({type: PAIRING_SUCCESS, pairing})
        ]
    }catch(error){
        console.log('yelp pair err', error);
    }
}
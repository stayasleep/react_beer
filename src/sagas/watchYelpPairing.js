import {takeLatest} from 'redux-saga/effects';
import {yelpPairSaga} from './yelpPairSaga';
import {YELP_PAIRING_REQ} from '../actions/types';

export default function* watchYelpPairing(){
    yield takeLatest(YELP_PAIRING_REQ, yelpPairSaga);
}

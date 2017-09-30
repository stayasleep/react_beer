import { fork } from 'redux-saga/effects';
import watchLocationSaga from './watchLocationSaga';
import watchYelpPairing from './watchYelpPairing';

//register the watching saga and export it as a single generator
export default function* startForman(){
    yield fork(watchLocationSaga);
    yield fork(watchYelpPairing);

}
import {takeLatest} from 'redux-saga/effects';
import {locationSaga} from './locationSaga';
import {MAP_CENTER_REQ} from '../actions/types';

export default function* watchLocationSaga(){
    yield takeLatest(MAP_CENTER_REQ, locationSaga);
}
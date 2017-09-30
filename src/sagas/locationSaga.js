import { put, call } from 'redux-saga/effects';
import {googleIt} from '../actions/api';
import {MAP_CENTER, MAP_CENTER_ERR} from '../actions/types';

export function* locationSaga({payload}){
    console.log('my load',payload);
    try{
        //const map = yield call(googleIt, payload);
        yield put({type: MAP_CENTER, payload}); //map is supposed to be an object like {lat: 1234, lng: 456}
    } catch(error){
        //catch error here if user enter location and it goes wrong
        yield put({type: MAP_CENTER_ERR, error});
    }
}
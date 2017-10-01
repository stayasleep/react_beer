import { put, call } from 'redux-saga/effects';
import {googleIt} from '../actions/api';
import {MAP_CENTER, MAP_CENTER_ERR} from '../actions/types';

export function* locationSaga({payload}){

    try{
        yield put({type: MAP_CENTER, payload}); //load is an object
    } catch(error){
        yield put({type: MAP_CENTER_ERR, error});
    }
}
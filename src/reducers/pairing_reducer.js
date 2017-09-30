import {PAIRING_SUCCESS} from '../actions/types';

const defaultState = {pairing: []};

export default function (state=defaultState, action) {
    switch (action.type){
        case PAIRING_SUCCESS:
            return {...state, pairing:action.pairing};
        default:
            return state;
    }
}
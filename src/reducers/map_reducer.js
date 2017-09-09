import {
    TESTING
} from '../actions/types';

const defaultState = {tbd:null};

export default function(state = defaultState, action){
    switch(action.type){
        case TESTING:
            return {...state};
        default:
            return state;
    }
}
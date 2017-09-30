import {YELP_SUCCESS} from '../actions/types';


const defaultState= {yelp: []};

export default function(state=defaultState, action){
    switch (action.type){
        case YELP_SUCCESS:
            return {...state, yelp: action.businesses};
        default:
            return state;
    }
}
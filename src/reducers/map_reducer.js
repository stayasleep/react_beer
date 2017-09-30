import {
    MAP_CENTER,
} from '../actions/types';

const defaultState = {center: {lat:33.7882323, lng: -118.2961973}};

export default function(state = defaultState, action){
    switch(action.type){
        case MAP_CENTER:
            console.log('map center reducer',action);
            return {...state, center:{lat:action.payload.lat, lng: action.payload.lng}};
        default:
            return state;
    }
}
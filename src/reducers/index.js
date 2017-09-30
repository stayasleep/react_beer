import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import mapReducer from './map_reducer';
import pairingReducer from './pairing_reducer';
import yelpReducer from './yelp_reducer';

const rootReducer = combineReducers({
    form: formReducer,
    maps: mapReducer,
    yelp: yelpReducer,
    pairing: pairingReducer,
});

export default rootReducer;
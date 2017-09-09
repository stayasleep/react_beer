import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import mapReducer from './map_reducer';

const rootReducer = combineReducers({
    form: formReducer,
    maps: mapReducer,
});

export default rootReducer;
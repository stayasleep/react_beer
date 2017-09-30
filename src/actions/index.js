import {MAP_CENTER_REQ} from './types';

export const centerGoogleMap = (address) => ({
    type: MAP_CENTER_REQ,
    payload: {lat: address.lat, lng: address.lng}
});
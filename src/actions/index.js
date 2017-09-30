import {MAP_CENTER_REQ, YELP_PAIRING_REQ} from './types';

export const centerGoogleMap = (address) => ({
    type: MAP_CENTER_REQ,
    payload: {lat: address.lat, lng: address.lng}
});

export const queryYelpAndPairing = (searchObject) =>({
    type: YELP_PAIRING_REQ,
    payload: searchObject
});
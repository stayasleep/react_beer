import axios from 'axios';

const BASE = "http://localhost:8080/react_beer/server";

export const callFoodPairings =(beer) => {
    console.log('my food pair',beer);
    let data={key: "075d4da050ae5fd39db3ded4fd982c92",name: `${beer.brewery}` , url: "http://api.brewerydb.com/v2/beers"};
    return axios.post(`${BASE}/proxy.php`,data).then((response) =>{
        console.log('food result',response);
        return response.data.filter((beer,index)=>{
            if(beer.foodPairings){
                return {name: beer.name, foodPairings: beer.foodPairings};
            }
        })
            .map((beer)=>({
                name: beer.name,
                foodPairings: beer.foodPairings,
            }))
    })
};


export const callYelp = (searchObject) => {
    let data = {term: searchObject.beer, location: `${searchObject.location.lat},${searchObject.location.lng}`};

    return axios.post(`${BASE}/yelp/yelp.php`, data).then((response) => {
        console.log('yelp response',response);
        return response.data.businesses.map((business)=>{
            return {
                name: business.name,
                address: business.location.address[0],
                city: business.location.city,
                state: business.location.state_code,
                zip: business.location.postal_code,
                phone: business.display_phone,
                url: business.url,
                coords: {lat: business.location.coordinate.latitude, lng: business.location.coordinate.longitude},
                rating: business.rating_img_url,
                img: business.image_url,
            }
        })
    }).catch(err => {
        console.log('an err',err);
    })
};

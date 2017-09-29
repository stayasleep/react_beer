import axios from 'axios';

const BASE = "http://localhost:8080/react_beer/server";

export const callFoodPairings =(beer) => {

    let data={key: "075d4da050ae5fd39db3ded4fd982c92",name: `${beer}` , url: "http://api.brewerydb.com/v2/beers"};
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
    let data = {term: searchObject.beer, location: searchObject.location};

    return axios.post(`${BASE}/yelp/yelp.php`, data).then((response) => {
        console.log('yelp response',response);
    }).catch(err => {
        console.log('an err',err);
    })
};
import axios from 'axios';

const BASE = "http://localhost:8080/react_beer/server/proxy.php";

export const callFoodPairings =(beer) => {

    let data={key: "075d4da050ae5fd39db3ded4fd982c92",name: `${beer}` , url: "http://api.brewerydb.com/v2/beers"};
    return axios.post(`${BASE}`,data).then((response) =>{
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
import React,{ Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
const googleMapURL ="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyDubEdvWZUOZX4jOrSXvXFxdtH3Xpuaonw";

class Maps extends Component{

    handleMapClick(){
        console.log('map clicked')
    }
    handleMapLoad(map) {
        this._mapComponent = map;
        if (map) {
            console.log(map.getZoom());
        }
    }

    render(){
        const GettingStartedGoogleMap = withGoogleMap((props) => (
            <GoogleMap
                defaultZoom={10}
                googleMapURL={googleMapURL}
                scaleControl={true}
                defaultCenter={{lat:17.09024, lng:-100.712891}}
                ref={props.onMapLoad}
                onClick={props.onMapClick}

            />
        ));
        return(
            <div style={{height:"50vh", width:"100%"}}>
                <GettingStartedGoogleMap
                    containerElement={
                        <div style={{height:"100%",width:"100%"}} />
                    }
                    mapElement = {
                        <div style={{height:"100%", width:"100%"}} />
                    }
                    onMapLoad={this.handleMapLoad.bind(this)}
                    onMapClick={this.handleMapClick.bind(this)}
                   // markers={this.state.markers}
                    //onMarkerRightClick={this.handleMarkerRightClick}

                />
            </div>
        )
    }
}

export default Maps;
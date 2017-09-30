import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
const googleMapURL ="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyDubEdvWZUOZX4jOrSXvXFxdtH3Xpuaonw";

class Maps extends Component{

    handleMapClick(){
        console.log('map clicked')
    }
    handleMapLoad(map) {
        this._mapComponent = map;
        if (map) {
            console.log('zoom');
            console.log(map.getZoom());
        }
    }

    render(){
        console.log('state check',this.props);
        const GettingStartedGoogleMap = withGoogleMap((props) => (
            <GoogleMap
                defaultZoom={10} //need
                defaultCenter={props.center} //we use the default from redux until user enters in an Address to center the map
                googleMapURL={googleMapURL} //need because not using withScriptJs
                scaleControl={true}
                ref={props.onMapLoad}
                onClick={props.onMapClick}
            >
                <Marker position={{ lat: -34.39701, lng: 150.64401 }}/>
            </GoogleMap>
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
                    isMarkerShown
                    center={this.props.center} //pass in the default center on map load, and then the location entered as new center for each render
                />
            </div>
        )
    }
}
//if this.props.locatin is false, use defaultCenter jsX above

const mapStateToProps = (state) =>{
    // console.log('state uhh',state);
    return {
        center: state.maps.center,

    }
};

export default connect(mapStateToProps)(Maps);
// export default Maps;
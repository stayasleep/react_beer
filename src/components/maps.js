import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { withGoogleMap, GoogleMap, Marker, InfoWindow, DirectionsRenderer } from 'react-google-maps';
import icon from '../images/beer.png';
const googleMapURL ="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyDubEdvWZUOZX4jOrSXvXFxdtH3Xpuaonw";


class Maps extends Component{
    constructor(props){
        super(props);
        this.state={};
    }

    handleMapClick(){
        // console.log('map clicked')
    }
    handleMapLoad(map) {
        this._mapComponent = map;
        if (map) {
            // console.log(map.getZoom());
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.markers.length > 0){
            let total = nextProps.markers.length;
            this.setState({isOpen: Array(total).fill(false), showDirection: Array(total).fill(false)});//create an array which will house state for each marker returned
        }
    }
    handleInfoToggle(index){
        // const isOpenState = this.state.isOpen.slice();
        let markerLength = this.state.isOpen.length;
        let isOpenState = Array(markerLength).fill(false);
        let directions = Array(markerLength).fill(false);
        isOpenState[index] = !this.state.isOpen[index];
        this.setState({isOpen: isOpenState, showDirection: directions});
    }
    handleMapDirections(index){
        const directions = this.state.showDirection.slice();
        directions[index] = !this.state.showDirection[index];
        this.setState({showDirection: directions});

    }

    render(){
        const GettingStartedGoogleMap = withGoogleMap((props) => (
            <GoogleMap
                defaultZoom={12} //need
                defaultCenter={props.center} //centering the map
                googleMapURL={googleMapURL} //req'd
                scaleControl={true}
                ref={props.onMapLoad}
                onClick={props.onMapClick}
            >
                {props.markers.length>0 && props.markers.map((marker,index) =>(
                    <Marker key={index} icon={icon} position={{lat: marker.coords.lat, lng: marker.coords.lng}} onClick={props.onToggleOpen(index)}>
                        {props.isOpen.isOpen[index] && <InfoWindow onCloseClick={props.onToggleOpen(index)}>
                            <div className="info-window">
                                <div className="marker-name">
                                    {marker.name}
                                </div>
                                <div className="marker-address">
                                    {marker.address}
                                </div>
                                <div className="marker-add-2">
                                    {`${marker.city}, ${marker.state} ${marker.zip}`}
                                </div>
                                <div className="marker-phone">
                                    {marker.phone}
                                </div>
                                <div className="marker-options">
                                    <div className="marker-yelp"><a href={marker.url} target="_blank">Read More</a></div>
                                </div>
                            </div>
                        </InfoWindow>}
                    </Marker>
                ))}
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
                    onToggleOpen={(index)=> this.handleInfoToggle.bind(this,index)}
                    onRenderDirections={(index)=> this.handleMapDirections.bind(this,index)}
                    markers={this.props.markers}
                    //onMarkerRightClick={this.handleMarkerRightClick}
                    isMarkerShown
                    isOpen={this.state}
                    showDirection={this.state}
                    center={this.props.center} //pass in the default center on map load, and then the location entered as new center for each render
                />
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        center: state.maps.center,
        markers: state.yelp.yelp,

    }
};

export default connect(mapStateToProps)(Maps);

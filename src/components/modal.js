import React, { Component } from 'react';
import { Alert,Button, Modal, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import renderInput from './utilities/render_input';
import {callFoodPairings, callYelp} from '../actions/api';
import renderBeer from './utilities/render_beer';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import {centerGoogleMap, queryYelpAndPairing} from '../actions/index';



class ModalMenu extends Component{

    constructor(props){
        super(props);
        this.state={
            show: this.props.show,
            location: false,
            warning: false,
            value: "IPA Beer",
            address:""
        };
        this.onChange = (address) => this.setState({ address });
        this.setLocation = this.setLocation.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount(){
        //callYelp({beer:"Amber", location:"Irvine, CA"}).then(biz => console.log('yelpit',biz));
        //callFoodPairings("Amber").then(amber=>console.log('am',amber)); //test api

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.again){
            this.setState({show: true});
        }
    }

    //allows us to geocode users location
    setLocation(event){
        event.preventDefault();

        geocodeByAddress(this.state.address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {

                console.log('latlng',latLng);
                this.props.dispatch(centerGoogleMap(latLng))
            })
            .catch(error => console.error('Error', error));
        this.setState({location: true, warning: false});

    }
    //handles the changing of radio buttons
    handleChange(event){
        this.setState({value: event.target.value});
    }

    //submit the form contaning our buttons
    handleSubmit(values){
        if(this.state.location){
            console.log('approved',values);
            console.log('my geo',this.props.geoAddress);
            let brewery;
            if(values.beer === "IPA Beer"){
                brewery = "American%20IPA";
            }
            switch (values.beer){
                case "IPA Beer":
                    brewery = "American IPA";
                    break;
                case "Double IPA Beer":
                    brewery = "Imperial%20IPA";
                    break;
                case "Amber":
                    brewery = "Amber";
                    break;
                case "Belgium Beer":
                    brewery = "Belgian%20Dubbel";
                    break;
                case "Lager Beer":
                    brewery = "American%20Lager";
                    break;
                case "Porter Beer":
                    brewery = "Robust%20Porter";
                    break;
                default:
                    brewery = "Stout";
            }
            let search ={beer: values.beer, location: this.props.geoAddress, brewery: brewery};
            this.props.dispatch(queryYelpAndPairing(search));
            this.setState({show: !this.state.show});
            //call to pairings with beer
        }else{
            console.log('eh');
            this.setState({warning: true});
        }

    }

    render(){
        const { handleSubmit, reset, submitting } = this.props;
        console.log('state eh',this.state);
        console.log('props eh',this.props);

        const inputProps = {
            name: "location",
            placeholder: "Enter Location",
            autoFocus: true,
            type: "search",
            value: this.state.address,
            onChange: this.onChange,
        };
        const options={
            types: ["geocode"],
            componentRestrictions: {country:'us'}
        };

        return(
            <Modal show={this.state.show}>
                <Modal.Header>
                    <Modal.Title>Grab A Beer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit((values) => {this.handleSubmit(values)})}>
                        <PlacesAutocomplete inputProps={inputProps} options={options}/>
                        {/*<Field className="form-control location-field" type="text" label="Enter Location" name="location" component={renderInput} />*/}
                        <Button block={true} bsStyle="primary" onClick={this.setLocation}  type="button" >Set Location</Button>
                        {this.state.warning ?
                            (
                                <Alert bsStyle="danger" >
                                    <h4>Error! Must set a location before you may continue.</h4>
                                    <p>Enter a location above or click on the geolocation button to the side.</p>
                                </Alert>
                            ): null
                        }
                        {this.state.location ?
                            (
                                <Alert bsStyle="success">
                                    <h4>Your location is now set!</h4>
                                </Alert>
                            ) : null
                        }
                        <h3>Select A Beer Style:</h3>
                            <label>
                                <Field name="beer" type="radio" value="IPA Beer" onChange={this.handleChange} checked={this.state.value === "IPA Beer"}  component="input" />{' '}India Pale Ale
                            </label>
                            <br/>
                            <label>
                                <Field name="beer" type="radio" value="Double IPA Beer" onChange={this.handleChange} checked={this.state.value === "Double IPA Beer"}  component="input"  />{' '}Imperial IPA
                            </label>
                            <br/>
                            <label>
                                <Field name="beer" type="radio" value="Amber" onChange={this.handleChange} checked={this.state.value === "Amber"} component="input" />{' '}Amber
                            </label>
                            <br/>
                            <label>
                                <Field name="beer" type="radio" value="Belgium Beer" onChange={this.handleChange} checked={this.state.value === "Belgium Beer"} component="input" />{' '}Belgium
                            </label>
                            <br/>
                            <label>
                                <Field name="beer" type="radio" value="Lager Beer" onChange={this.handleChange} checked={this.state.value === "Lager Beer"} component="input" />{' '}Lager
                            </label>
                            <br/>
                            <label>
                                <Field name="beer" type="radio" value="Porter Beer" onChange={this.handleChange} checked={this.state.value === "Porter Beer"} component="input" />{' '}Porter
                            </label>
                            <br/>
                            <label>
                                <Field name="beer" type="radio" value="Stout Beer" onChange={this.handleChange} checked={this.state.value === "Stout Beer"} component="input" />{' '}Stout
                            </label>
                            <Button block={true} bsStyle="primary" type="submit" >🍻 Grab A Beer</Button>
                    </form>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        )
    }
}
function validate(values){
    console.log('vals',values);
    const errors = {};

    if(!values.location){
        errors.location = "Required";
    }
    if(!values.beer){
        errors.beer = "Required";
    }
    return errors;
}

ModalMenu = reduxForm({
    form: 'beer',
    initialValues: {beer: "IPA Beer"},
    validate,
})(ModalMenu);

const mapStateToProps = (state)=>{
    return{
        setLocation: state.form.beer,
        geoAddress: state.maps.center,
    }
};

export default connect(mapStateToProps)(ModalMenu);
// export default ModalMenu;

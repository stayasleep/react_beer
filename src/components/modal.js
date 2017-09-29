import React, { Component } from 'react';
import { Alert,Button, Modal, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import renderInput from './utilities/render_input';
import {callFoodPairings} from '../actions/api';
import renderBeer from './utilities/render_beer';

class ModalMenu extends Component{
    constructor(props){
        super(props);
        this.state={
            show: this.props.show,
            location: false,
            warning: false,
            value: "American%20IPA",
        };
        this.setLocation = this.setLocation.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount(){
        callFoodPairings("Amber").then(amber=>console.log('am',amber)); //test api

    }
    componentWillReceiveProps(nextProps){
        console.log('next', nextProps);
        if(nextProps.again){
            this.setState({show: true});
        }
    }
    setLocation(){
        //update redux with location value set here
        //perform google maps api request
        //setState to true or something so you can submit form
        console.log('setttting');
    }

    handleChange(event){
        console.log('handle me',event.target);
        this.setState({value: event.target.value});
    }
    handleSubmit(values){
        if(this.state.location){
            console.log('approved',values);
            // this.setState({show: !this.state.show});
            //call to pairings with beer
            //call to yelp with beer
        }else{
            console.log('eh');
            this.setState({warning: true});
        }

    }

    render(){
        const { handleSubmit, reset, submitting } = this.props;
        console.log('state eh',this.state);
        return(
            <Modal show={this.state.show}>
                <Modal.Header>
                    <Modal.Title>Grab A Beer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit((values) => {this.handleSubmit(values)})}>
                        <Field className="form-control location-field" type="text" label="Enter Location" name="location" component={renderInput} />
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
                                <Alert bsStyle="primary">
                                    <h4>Your location is set to: </h4>
                                </Alert>
                            ) : null
                        }
                        <h3>Select A Beer Style:</h3>
                            <label>
                                <Field name="beer" type="radio" value="American%20IPA" onChange={this.handleChange} checked={this.state.value === "American%20IPA"}  component="input" />{' '}India Pale Ale
                            </label>
                            <br/>
                            <label>
                                <Field name="beer" type="radio" value="Imperial%20IPA" onChange={this.handleChange} checked={this.state.value === "Imperial%20IPA"}  component="input"  />{' '}Imperial IPA
                            </label>
                            <br/>
                            <label>
                                <Field name="beer" type="radio" value="Amber" onChange={this.handleChange} checked={this.state.value === "Amber"} component="input" />{' '}Amber
                            </label>
                            <br/>
                            <label>
                                <Field name="beer" type="radio" value="Belgian%20Dubbel" checked={this.state.value === "Belgian%20Dubbel"} component="input" />{' '}Belgium
                            </label>
                            <br/>
                            <label>
                                <Field name="beer" type="radio" value="American%20Lager" checked={this.state.value === "American%20Lager"} component="input" />{' '}Lager
                            </label>
                            <br/>
                            <label>
                                <Field name="beer" type="radio" value="Robust%20Porter" checked={this.state.value === "Robust%20Porter"} component="input" />{' '}Porter
                            </label>
                            <br/>
                            <label>
                                <Field name="beer" type="radio" value="Stout" checked={this.state.value === "Stout"} component="input" />{' '}Stout
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
    validate,
})(ModalMenu);

export default ModalMenu;

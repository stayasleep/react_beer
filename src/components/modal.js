import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import renderInput from './utilities/render_input';
import renderBeer from './utilities/render_beer';

class ModalMenu extends Component{
    constructor(props){
        super(props);
        this.state={
            show: true,
        };
    }
    handleSubmit(values){
        console.log('submiting things',values);
    }

    render(){
        const { handleSubmit, reset, submitting } = this.props;
        return(
            <Modal show={this.state.show}>
                <Modal.Header>
                    <Modal.Title>Grab A Beer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit((values) => {this.handleSubmit(values)})}>
                        <Field className="form-control location-field" type="text" label="Enter Location" name="location" component={renderInput} />
                        <Button block={true} bsStyle="primary"  type="button" >Set Location</Button>
                        <h3>Select A Beer Style:</h3>
                        <label>
                            <Field name="beer" type="radio" value="American%20IPA" checked={true}  component="input" />{' '}India Pale Ale
                        </label>
                        <br/>
                        <label>
                            <Field name="beer" type="radio" value="Imperial%20IPA" component="input"  />{' '}Imperial IPA
                        </label>
                        <br/>
                        <label>
                            <Field name="beer" type="radio" value="Amber" component="input" />{' '}Amber
                        </label>
                        <br/>
                        <label>
                            <Field name="beer" type="radio" value="Belgian%20Dubbel" component="input" />{' '}Belgium
                        </label>
                        <br/>
                        <label>
                            <Field name="beer" type="radio" value="American%20Lager" component="input" />{' '}Lager
                        </label>
                        <br/>
                        <label>
                            <Field name="beer" type="radio" value="Robust%20Porter" component="input" />{' '}Porter
                        </label>
                        <br/>
                        <label>
                            <Field name="beer" type="radio" value="Stout" component="input" />{' '}Stout
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
    return errors;
}

ModalMenu = reduxForm({
    form: 'beer',
    validate,
})(ModalMenu);

export default ModalMenu;

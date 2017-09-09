import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class ModalMenu extends Component{
    constructor(props){
        super(props);
        this.state={
            show: true,
        };
    }

    render(){
        return(
            <Modal show={this.state.show}>
                <Modal.Header>
                    <Modal.Title>Grab A Beer</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        )
    }
}
export default ModalMenu;
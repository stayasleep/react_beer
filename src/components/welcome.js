import React, { Component } from 'react';
import ModalMenu from './modal';

class Welcome extends Component{
    constructor(props){
        super(props);
        this.state={
            showModal: true,
        };
    }

    render(){
        return(
            <div>
                <div>Grab A Beer</div>
                <ModalMenu/>
            </div>
        )
    }
}

export default Welcome;
import React, { Component } from 'react';
import ModalMenu from './modal';
import Tap from './tap';

class Welcome extends Component{
    constructor(props){
        super(props);
        this.state={
            showModal: false,
        };
    }

    handleTapClick(){
        console.log("tap dat")
    }

    render(){
        return(
            <div>
                <div>Grab A Beer</div>
                <ModalMenu/>
                <Tap onClick={()=> {this.handleTapClick.bind(this)()}}/>
            </div>
        )
    }
}

export default Welcome;
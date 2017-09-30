import React, { Component } from 'react';
import ModalMenu from './modal';
import Maps from './maps';
import Tap from './tap';

class Welcome extends Component{
    constructor(props){
        super(props);
        this.state={
            showModal: true,
        };
    }

    handleTapClick(){
        console.log("tap dat");
        this.setState({modal: true});
    }

    render(){
        console.log('render welcome',this.state);
        return(
            <div>
                <div className="title">Grab A Beer</div>
                <Maps/>
                <ModalMenu show={this.state.showModal} again={this.state.modal}/>
                <Tap onClick={()=> {this.handleTapClick.bind(this)()}}/>
            </div>
        )
    }
}

export default Welcome;
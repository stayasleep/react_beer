import React, { Component } from 'react';
import {connect} from 'react-redux';
import ModalMenu from './modal';
import Maps from './maps';
import Tap from './tap';
import Pairing from './pairings';

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
                <Pairing pair={this.props.pairing}/>
                <Tap onClick={()=> {this.handleTapClick.bind(this)()}}/>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return{
        pairing: state.pairing.pairing,
    }
};


export default connect(mapStateToProps)(Welcome);
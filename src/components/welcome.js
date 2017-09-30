import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Col} from 'react-bootstrap';
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
            <div className="container-fluid">
                <div className="title">Grab A Beer</div>
                <Maps/>
                <ModalMenu show={this.state.showModal} again={this.state.modal}/>
                <div className="row">
                    <Tap onClick={()=> {this.handleTapClick.bind(this)()}}/>
                    <Col md={6} mdOffset={3}>Placeholder</Col>
                    <Pairing pair={this.props.pairing}/>
                </div>
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
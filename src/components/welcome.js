import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Col} from 'react-bootstrap';
import ModalMenu from './modal';
import Maps from './maps';
import Tap from './tap';
import Pairing from './pairings';
import Yelp from './yelp'

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
                    <Yelp yelp={this.props.yelp}/>
                    <Pairing pair={this.props.pairing}/>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return{
        pairing: state.pairing.pairing,
        yelp: state.yelp.yelp
    }
};


export default connect(mapStateToProps)(Welcome);
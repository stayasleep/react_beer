import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Col} from 'react-bootstrap';
import ModalMenu from '../components/modal';
import Maps from '../components/maps';
import Tap from '../components/tap';
import Pairing from '../components/pairings';
import Yelp from '../components/yelp'

class Welcome extends Component{
    constructor(props){
        super(props);
        this.state={
            showModal: true,
        };
    }

    handleTapClick(){
        this.setState({showModal: true});
    }
    handleModalClose(){
        this.setState({showModal:false})
    }

    render(){
        return(
            <div className="container-fluid">
                <div className="title">Grab A Beer</div>
                <Maps/>
                <ModalMenu show={this.state.showModal}  onClose={()=>this.handleModalClose.bind(this)()}/>
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
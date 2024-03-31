import React, {Component} from 'react';
import '../Loading/Loading.css';
export default class Loading extends Component{
    constructor(){
        super()
        this.state= {
            fade: 'fade-out'
        }
    }
    componentDidMount(){
       this.setState({fade: "fade"})
    }
    render(){
        return(
            <div className="spinner-box">
                <div className="configure-border-1">  
                    <div className="configure-core"></div>
                </div>  
                <div className="configure-border-2">
                    <div className="configure-core"></div>
                </div> 
            </div>
        )
    }
}
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class CV extends React.Component{
    constructor(props){
        super(props)
        this.state = {
           home: false
        }
        
    }


  
    render(){
        return (
            <React.Fragment>
                <div class='menu'>
                <li><Link to='/'>{'<- home page'}</Link></li>
                <h1 id='categoryTitle'>
                   CURRICULUM VITAE
                </h1>
                <a><iframe src="Alexa-Marshall-CV.pdf"></iframe></a>
                </div>
                
                
            </React.Fragment>
        )
    }
}

export default CV
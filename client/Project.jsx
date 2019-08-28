import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Project extends React.Component{
    constructor(props){
        super(props)
        this.state = {
           
        }
    }

 
    render(){
        return (
        <React.Fragment>
            <div class='menu'>
            <li><Link to='/'>{'<- home page'}</Link></li>
            <h1 id='categoryTitle'>
               PROJECTS
            </h1>
            <img src="diana.jpg"></img>
            <p>under construction</p>
            </div>
            
            
        </React.Fragment>
        )
    }
}

export default Project
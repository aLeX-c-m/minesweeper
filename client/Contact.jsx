import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Contact extends React.Component{
    constructor(){
        super()
    }

    render(){
        return <React.Fragment>
            <div class='menu'>
                <li><Link to='/'>{'<- home page'}</Link></li>
                <h1 id='categoryTitle'>
                   CONNECT
                </h1>
                <img src='versailles.jpg'></img>
                <a href='https://www.linkedin.com/in/alexacmarshall'>LINKEDIN</a>
                <a href='https://github.com/aLeX-c-m'>GITHUB</a>
                <a href='mailto:alexacatherine.marshall@gmail.com'>EMAIL</a>
            </div>
            
        </React.Fragment>

        }


}

export default Contact
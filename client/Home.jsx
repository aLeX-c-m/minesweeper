import React from 'react'
import About from './About.jsx'
import Project from './Project.jsx'
import CV from './CV.jsx'
import Contact from './Contact.jsx'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            menuItems: ['PROJECTS', 'CV', 'CONTACT'],
            selectedItem: ''
        }
    }
    componentDidMount(){
    }

    navigate(item){
        
    }

    render(){
        return (
            <React.Fragment>
               <div class='menu'>
                    <img src='me.png' alt='alexa marshall'/>
                    <h1 id='title' class='fade'>ALEXA MARSHALL</h1>
                    {this.state.menuItems.map((item)=>(<li><Link to={'/' + item.toLowerCase()}>{item}</Link></li>))}  
                </div> 
            </React.Fragment>)
    }
}

export default Home

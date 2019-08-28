import React from 'react'
import ReactDOM from 'react-dom'
import Home from './Home.jsx'
import About from './About.jsx'
import Project from './Project.jsx'
import CV from './CV.jsx'
import Contact from './Contact.jsx'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            menuItems: ['ABOUT', 'PROJECTS', 'CV', 'CONTACT'],
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
                <Router>
                    <Switch>
                        <Route path="/about" component={ props => <About {...props}/>} />
                        <Route path="/projects" component={ props => <Project {...props}/>} />
                        <Route path="/cv" component={ props => <CV {...props}/>} />
                        <Route path="/contact" component={ props => <Contact {...props}/>} />
                        <Route path="/" component={ props => <Home {...props}/>}/>
                    </Switch>
                </Router>
            </React.Fragment>)
    }
}

ReactDOM.render(<App/>, document.getElementById('app'))


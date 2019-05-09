import React, {Component} from 'react'
import {Route, BrowserRouter as Router} from 'react-router-dom'
import Login from '../views/login'
import Home from '../views/home'
import Detail from '../views/detail'

class RouterIndex extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component={Login}/>
                <Route path="/Home" component={Home}/>
                <Route path="/Detail" component={Detail}/>
            </Router>

        )
    }
}
export default RouterIndex
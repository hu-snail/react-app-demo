import React, {Component} from 'react'
import {Link, Route, BrowserRouter as Router} from 'react-router-dom'
import Home from '../views/home'
import Detail from '../views/detail'

class RouterIndex extends Component {
    render() {
        return (
            <Router>
                <ul>
                    <Link to="/">home</Link>
                    <Link to="/detail">detail</Link>
                </ul>
                <Route exact path="/" component={Home}/>
                <Route path="/Detail" component={Detail}/>
            </Router>

        )
    }
}
export default RouterIndex
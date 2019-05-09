import React, {Component} from 'react'
import { Button } from 'element-react'
import 'element-theme-default';
// import './home.scss'

class Home extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor (props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick () {
        // console.log(this)
        this.props.history.push({pathname: '/detail'})
    }
    render() {
        return (
            <div>
                <h1 className="title">首页</h1>
                <Button type="primary">Hello</Button>
                <h4 onClick={this.handleClick}>查看详情</h4>
            </div>
        )
    }
}

export default Home;

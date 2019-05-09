import React, {Component} from 'react'
import {Input, Button} from 'element-react'
import API from '../common/request/api'
import md5 from 'js-md5'
class Home extends Component {
    constructor (props) {
        super(props)
        this.state = {
            phone: '18966668888',
            password: md5('123456a')
        }
        this.handleLogin = this.handleLogin.bind(this)
    }
    handleLogin() {
        console.log(11)
        API.login(this.getParama()).then(res => {
            console.log(res)
        })
    }
    getParama() {
        return this.state
    }
    render() {
        return (
            <div>
               <Input placeholder="请输入内容" type="text" value={this.state.phone}/>
               <Input placeholder="请输入内容" type="password" value={this.state.password}/>
               <Button type="primary" onClick={this.handleLogin}>主要按钮</Button>
            </div>
        )
    }
}

export default Home;

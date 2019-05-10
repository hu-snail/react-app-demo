## 使用create-react-app脚手架搭建项目

[toc]

> 技术栈版本号：
>
> 1.create-react-app： `3.0.0`  — 脚手架
>
> 2.react: `^16.8.6`
>
> 3.react-dom: `^16.8.6`
>
> 4.react-router-dom: `^5.0.0`  — 路由
>
> 5.react-scripts: `3.0.0`
>
> 6.element-react: `^1.4.33`  — element-react UI库
>
> 7.element-theme-default: `^1.4.13` — element-react 默认主题
>
> 8.axios: `^0.18.0"` http请求
>
> 9.js-cookie： `^2.2.0`
>
> 10.js-md5: `^0.7.3`

### 全局安装脚手架

命令终端：`npm install -g create-react-app`

#### 使用create-react-app构建项目

命令终端：`npx create-react-app my-app ` 或 `create-react-app my-app`

### 文件目录

```json
|- react-app 根目录
   |- node-modules 依赖包文件
   |- public 公共资源文件夹
      |- index.html 页面模版，不可删除
      |- mainifest.json 移动端配置文件
   |- src 源码文件夹
      |- assets 静态资源文件
	 |- scss scss预编译文件夹
	    |- theme.scss 主题配置文件
	    |- reset.scss 浏览器重置文件
	    |- customComponent.scss 自定义组件公共样式文件
	    |- eleReset.scss element-react UI样式重置样式文件
	    |- minxs.scss 混合模式
	    |- common.scss 公共样式文件
	    |- style.scss 主要样式文件
	 |- images 图片资源文件夹
	 |- fonts 字体图标文件夹
       |- common js公共库文件夹
	  |- requect http请求相关
	  |- |- api.js 接口文件
	  |- |- config.js 请求配置
	  |- |- cookie.js cookiep文件
	  |- |- index.js axios封装
	  |- const.js 公共常量配置文件
       |- components 公共组件文件夹
	  |- utils js工具类文件夹
	     |- utils.js 常用工具类封装文件
	     |- eleUtil.js 饿了么element-react UI库封装
       |- views 所有页面文件夹
          |- home 首页文件夹
          |- |- index.js
          |- detail 详情文件夹
          |- |- index.js
       |- router 路由文件夹
	  |- index.js
       |- index.js js入口文件
		
```



### 安装路由

命令终端: `cnpm install react-router-dom --save`

#### 路由配置

安装好路由后，在`src`目录下创建`router/index.js`文件，具体配置如下

```js
index.js
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
```



home页面`src/views/home/index.js：`

```react

import React, {Component} from 'react'

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
                <h4 onClick={this.handleClick}>查看详情</h4>
            </div>
        )
    }
}

export default Home;

```



detail页面`src/views/detail/index.js:`

```react
import React, {Component} from 'react'

class Detail extends Component{
  render() {
    return (
      <h1 className="title">详情</h1>
    )
  }

  componentDidMount() {
    console.log(this.props.match);
  }
}

export default Detail;

```



### 使用Element-react UI

> 详情查看[官方文档](<https://elemefe.github.io/element-react/#/zh-CN/quick-start> 'element-react')

#### 安装

```sh
npm i element-react --save
// 安装主题
npm install element-theme-default --save
```

#### 使用

```react
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'element-react';

import 'element-theme-default';

ReactDOM.render(<Button type="primary">Hello</Button>, document.getElementById('app'));
```

#### 踩坑

安装好element-react 可能会出现模块缺失，安装语法：`npm install 'xxx' `即可



### 使用sass

终端命令：`npm install node-sass sass-loader --save-dev`，配置文件修改，文件路径`node-modules/react-scripts/config/webpack.config.js`，修改代码如下：

```js

	{
  	loader: require.resolve('file-loader'),
    exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/, /\.scss$/], // 此处添加 ‘/\.scss$/’
      options: {
        name: 'static/media/[name].[hash:8].[ext]',
      },
   },
   { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader']}, // 添加这一行代码，即可使用
     
```



### Axios请求封装

> 接口请求封装对于项目很重要，减少许多重复性的功能。对于接口异常统一入口处理
>
> 安装axios: `npm install axios --save`

#### 请求配置文件config.js

文件路径：`src/common/request/config.js`

```js
// 请求配置文件
export default {
    // 状态码配置， 根据后端定义
    codeStatus: {
        SUCCESS_CODE: 100, // 成功
        ERROR_SHOW_CODE: 1000,  // 错误，需要显示给用户的状态码
        ERROR_SHOW_CODE_2: 2000
    },
    // 请求加载动画
    loadingConfig: {
        show: true, // 显示
        hide: false // 隐藏
    }
}
```



#### cookie配置

> 安装cookie: `npm install js-cookie --save`

文件路径： `src/common/request/cookie.js`

```js
import Cookies from 'js-cookie'

export function getToken() {
    return Cookies.get('accessToken')
}
  
export function setToken(token) {
    Cookies.set('accessToken', token)
}

export function removeToken() {
    return Cookies.remove('accessToken')
}
```



#### 接口请求封装

> 配置文件中：`utils` ，`eleUtils` 参考文件路径`src/utils`文件

文件路径： `src/common/request/index.js`

```js
import axios from 'axios'
import qs from 'qs'
import { deepClone } from '../../utils/utils'
import { getToken } from './cookie'
import { ENV_URL, PRO_URL, POST } from '../const'
import { getValidToken } from '../../utils/utils'
import { showMessage } from '../../utils/eleUtils'
import reqConfig from './config'

// 请求API服务地址
const baseURL = process.env.NODE_ENV === 'development' ? ENV_URL : PRO_URL

// 创建axios实例
const service = axios.create({
    baseURL: baseURL,
    timeout: 5 * 1000 // 超时时间
})

// 请求配置
const request = (config) => {
    // 请求参数
    const params = requestParams(config)
    if (config.method === POST) {
        // 数据处理
        config.data = qs.stringify(params)
        // 删除请求参数
        delete config.params
    } else config.params = params

    return new Promise((resolve, reject) => {
        service(config).then(res => {
            resolve(res)
        }).catch(err => {
            // config.catch 为true 执行错误拦截处理
            if (config.catch) reject(err)
        })
    })
}

/**
 * @description 请求参数处理
 * @param config 请求配置参数
 * 注意： 参数配置，根据后端设定
 */
const requestParams = (config) => {
    // 参数深度拷贝
    const params = deepClone(config.params)
    // 设置accessToken
    params.accessToken = getToken('accessToken') || ''
    // 时间戳
    params.timestamp = new Date().getTime()
    // token
    params.token = getValidToken(params)
    return params;
}

// 请求拦截器
service.interceptors.request.use(
    // 设置请求头信息
    config => {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
        return config
    },
    error => {
        // Do something with request error
        console.log(error)
        // 处理错误拦截
        Promise.reject(error)
    }
)

//  响应拦截器
service.interceptors.response.use(response => {
    const res = response.data
    console.log(reqConfig)
    if (res.status === reqConfig.codeStatus.SUCCESS_CODE) return response.data
    // 有错但是不直接报, 根据后端定义
    if (res.status > reqConfig.codeStatus.ERROR_SHOW_CODE && res.status < reqConfig.codeStatus.ERROR_SHOW_CODE_2) return Promise.reject(res.error)
    showMessage(res.error, 'error')
    return Promise.reject(res.error)
  }, error => {
    if (error.message === 'Network Error') error.message = '连接服务器异常'
    else if (error.message === 'timeout of 5000ms exceeded') error.message = '网络连接超时，请检查重试！'
    showMessage(error.message, 'error')
    return Promise.reject(error)
  }
)

export default request

```



### <a id="utils">Utils工具类封装</a>

> 项目中会用到很多常见的处理函数。如果不进行封装处理，我们每次调用都需要重新引用重复性的代码。
>
> 安装js-md5：`npm install js-md5 --save-dev` 密码和请求参数都需要md5进行加密。

#### 常用工具类封装

文件路径： `src/utils/utils.js`

```js
import md5 from 'js-md5'
import { TOKEN_KEY } from '../common/const'
/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 */
export function deepClone(source) {
    if (!source && typeof source !== 'object') {
      throw new Error('error arguments', 'shallowClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach(keys => {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    })
    return targetObj
}

/**
 * 根据请求参数生成token
 * @param params
 * @returns {token}
 */
export function getValidToken(params) {
    if (!params) {
      return
    }
    const arr = []
    let str = ''
    for (const key in params) {
      arr.push(key)
    }
    arr.sort()
    arr.map(item => {
      if (params[item] !== undefined && params[item] != null) {
        str += params[item]
      }
    })
    // console.log(str.toUpperCase() + TOKEN_KEY)
    return md5(str.toUpperCase() + TOKEN_KEY)
}

```



#### element-react常用UI库封装

文件路径：`src/utils/eleUtils.js`

```js
// 饿了么组件抽象工具类
import { Message } from 'element-react'

/**
 * @description 消息弹框
 * @param msg 消息内容
 * @param type 消息类型 （error, success,warning,info）
 * @param time 显示时间 默认 5s
 */
export const showMessage = (msg, type, time = 5 * 1000) => {
    Message({
        message: msg,
        type: type,
        duration: time
    })
}

```



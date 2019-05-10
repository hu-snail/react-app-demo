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

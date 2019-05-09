import request from './index'
const POST = 'post'
// const GET = 'get'

// 用户模块
const user = {
    login(params) {
        return request({ url: '/basic/login', method: POST, params, catch: true })
    }
}
export default {
    ...user
}
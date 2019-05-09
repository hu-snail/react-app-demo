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

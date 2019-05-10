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
    // eslint-disable-next-line
    arr.map(item => {
      if (params[item] !== undefined && params[item] != null) {
        str += params[item]
      }
    })
    // console.log(str.toUpperCase() + TOKEN_KEY)
    return md5(str.toUpperCase() + TOKEN_KEY)
}

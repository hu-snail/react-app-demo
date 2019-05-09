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
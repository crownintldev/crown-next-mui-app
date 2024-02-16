import axios from 'axios'
import Cookies from 'js-cookie'
import { store } from '../store/index'

export const signin = user => {
  return axios.post(`${process.env.NEXT_PUBLIC_AUTH}/auth/signin`, user)
}
export const signup = user => {
  return axios.post(`${process.env.NEXT_PUBLIC_AUTH}/auth/signup`, user)
}

//cookie
export const setCookie = (key, value) => {
  if (typeof window !== 'undefined') {
    Cookies.set(key, value, {
      expires: 1
    })
  }
}

export const removeCookie = key => {
  if (typeof window !== 'undefined') {
    Cookies.remove(key, {
      expires: 1
    })
  }
}

export const getCookie = key => {
  const state = store?.getState();
  return state?.token?.data
  // if (typeof window !== 'undefined') {
    // return Cookies.get("jwt")
  // }
}
export const accessToken = getCookie('jwt')

//localStorage
export const setLocalStorage = (key, value) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export const removeLocalStorage = key => {
  if (typeof window !== 'undefined') {
    return localStorage.removeItem(key)
  }
}

export const removeAuthenticate = (localStorageKey, token) => {
  removeLocalStorage(localStorageKey)
  removeCookie(token)
}

export const authenticate = (data, next) => {
  setCookie('jwt', data.accessToken)
  // setLocalStorage('token', data.token)
  setLocalStorage('userData', data.data)
  next()
}

export const isAuth = () => {
  if (typeof window !== 'undefined') {
    const cookieChecked = getCookie('jwt')
    if (cookieChecked) {
      if (localStorage.getItem('userData')) {
        return JSON.parse(localStorage.getItem('userData'))
      }
    }
  }
}

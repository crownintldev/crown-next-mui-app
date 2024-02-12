// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { getReducer } from 'src/store/apps/sliceActionReducer'
// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

//actions
import {
  signin,
  signup,
  isAuth,
  authenticate,
  getCookie,
  removeAuthenticate,
  accessToken,
  setCookie
} from 'src/action/auth-action'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)
  const dispatch = useDispatch()
  const setToken = getReducer('token')

  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    const accessToken = getCookie('jwt')
    const initAuth = async () => {
      if (accessToken) {
        setLoading(true)
        await axios
          .get(authConfig.meEndpoint, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
          .then(async response => {
            authenticate(response.data, () => {
              setUser(response.data.data)
              setCookie('jwt', response.data.accessToken)
              dispatch(setToken(response.data.accessToken))
              setLoading(false)
            })
          })
          .catch(() => {
            removeAuthenticate('userData', 'jwt')
            localStorage.removeItem('refreshToken')
            // localStorage.removeItem('userData')
            // localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
        removeAuthenticate('userData', 'jwt')
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params, errorCallback) => {
    setUser(null)
    removeAuthenticate('userData', 'jwt')
    signin(params)
      .then(response => {
        // params.rememberMe ? authenticate(response.data) : ''
        authenticate(response.data, () => {
          dispatch(setToken(response.data.accessToken))
          setUser(response.data.data)
          const returnUrl = router.query.returnUrl
          const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
          router.replace(redirectURL)
        })
      })
      .catch(err => {
        console.log('===auth context===', err)
        if (errorCallback) errorCallback(err)
      })
  }

  // const handleRegister = (params, errorCallback) => {
  //   signup(params)
  //     .then(response => {
  //       // params.rememberMe ? authenticate(response.data) : ''
  //       authenticate(response.data, () => {
  //         dispatch(setToken(response.data.accessToken))
  //         setUser(response.data.data)
  //         const returnUrl = router.query.returnUrl
  //         const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
  //         router.replace(redirectURL)
  //       })
  //     })
  //     .catch(err => {
  //       if (errorCallback) errorCallback(err)
  //     })
  // }

  const handleLogout = () => {
    setUser(null)
    removeAuthenticate('userData', 'jwt')
    // window.localStorage.removeItem('userData')
    // window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    // register: handleRegister,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }

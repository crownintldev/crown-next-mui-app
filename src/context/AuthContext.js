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
  // useEffect(() => {
  //   setLoading(false)
  //   const checkUser = isAuth()
  //   const accessToken = getCookie('jwt')
  //   console.log(checkUser)
  //   if (checkUser && accessToken) {
  //     setUser(checkUser)
  //     dispatch(setToken(accessToken))
  //     setLoading(false)
  //   } else if (
  //     authConfig.onTokenExpiration === 'logout' &&
  //     !router.pathname.includes('login')
  //   ) {
  //     router.replace('/login')
  //   }
  //    else {
  //     setLoading(false)
  //     removeAuthenticate('userData', 'jwt')
  //     router.replace('/login')
  //   }
  // }, [])
  
  useEffect(() => {
    const accessToken = getCookie('jwt')
    const initAuth = async () => {
      console.log("accessToken",accessToken)
      console.log("isAuth",isAuth())
      if (accessToken) {
        setLoading(true)
        await axios
          .get(authConfig.meEndpoint, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
          .then((response) => {
            authenticate(response.data, () => {
              console.log(response.data)
              dispatch(setToken(response.data.accessToken))
              setUser(response.data.data)
              setLoading(false)
            })
          })
          .catch(() => {
            removeAuthenticate('userData', 'jwt')
            setUser(null)
            setLoading(false)
            router.replace('/login')
            // if (!router.pathname.includes('login')) {
            //   router.replace('/login')
            // }
          })
      } else {
        setLoading(false)
        // removeAuthenticate('userData', 'jwt')
        router.replace('/login')
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params, errorCallback) => {
    setUser(null)
    removeAuthenticate('userData', 'jwt')
    signin(params)
      .then((response) => {
        // params.rememberMe ? authenticate(response.data) : ''
        authenticate(response.data, () => {
          dispatch(setToken(response.data.accessToken))
          setUser(response.data.data)
          const returnUrl = router.query.returnUrl
          const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
          router.replace(redirectURL)
        })
      })
      .catch((err) => {
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

// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import toast from 'react-hot-toast'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  spinner: false,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  const apiURL = process.env.NEXT_PUBLIC_URL
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)
  const [spinner, setSpinner] = useState(defaultProvider.spinner)

  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (storedToken) {
        setLoading(true)
        await axios
          .get(`${apiURL}${authConfig.meEndpoint}`, {
            headers: {
              Authorization: storedToken
            }
          })
          .then(async response => {
            if (response.status === 401) {
              localStorage.removeItem('userData')
              localStorage.removeItem('accessToken')
              setUser(null)
              setLoading(false)
              router.replace('/login')
              toast.error(`${response.data.message}`)
            }
            if (response.status === 200) {
              setLoading(false)
              setUser({ ...response.data.user })
            }
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
        setUser(null)
        localStorage.removeItem('userData')
        localStorage.removeItem('accessToken')
        router.replace('/login')
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params, errorCallback) => {
    setSpinner(true)
    axios
      .post(`${apiURL}${authConfig.loginEndpoint}`, params)
      .then(async response => {
        params.rememberMe
          ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.user.token)
          : null
        const returnUrl = router.query.returnUrl
        setUser({ ...response.data.user })
        setSpinner(false)
        params.rememberMe
          ? window.localStorage.setItem('userData', JSON.stringify(response.data.user))
          : null
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL)
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
        await sleep(2000)
        toast.success(`${response.data.message}`, {
          duration: 2000
        })
      })
      .catch(err => {
        setSpinner(false)
        if (errorCallback) errorCallback(err)
      })
  }
  const handleRegister = (params, errorCallback) => {
    setSpinner(true)
    axios
      .post(`${apiURL}${authConfig.registerEndpoint}`, params)
      .then(async response => {
        // params.rememberMe
        //   ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.user.token)
        //   : null
        const returnUrl = router.query.returnUrl
        // setUser({ ...response.data.user })
        // params.rememberMe
        //   ? window.localStorage.setItem('userData', JSON.stringify(response.data.user))
        //   : null
        if (
          response.data.user &&
          response.data.user.token &&
          response.data.user.status === 'pending'
        ) {
          const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
          router.replace(redirectURL)
          setSpinner(false)
          const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
          await sleep(2000)
          toast.success(`${response.data.message}`, {
            duration: 2000
          })
        }
      })
      .catch(err => {
        setSpinner(false)
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    spinner,
    setUser,
    setLoading,
    setSpinner,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }

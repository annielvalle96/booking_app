import { createContext, useContext, useEffect, useState } from 'react'
import axiosInstance from '../useful/axios-instance.js'
// import { Navigate } from 'react-router-dom'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)
  const [errors, setErrors] = useState('')
  const [loading, setLoading] = useState(true)

  const login = async (user) => {
    setLoading(true)
    try {
      const res = await axiosInstance.post('/user/login', user)
      if (res.status === 200) {
        try {
          const response = await axiosInstance.get(`/user/isAdmin/${res.data._id}`)
          if (response.status === 200) {
            setUser(res.data)
            setIsUserAuthenticated(true)
            setLoading(false)
            window.localStorage.setItem('booking_app_user', JSON.stringify({ id: res.data._id, username: res.data.username }))
          }
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Unknown error'
          setErrors(errorMessage)
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Unknown error'
      setErrors(errorMessage)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.post('/user/logout')
      if (res.status === 200) {
        setUser(null)
        setIsUserAuthenticated(false)
        setLoading(false)
        window.localStorage.removeItem('booking_app_user')
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Unknown error'
      setErrors(errorMessage)
    }
  }

  const checkLogin = async () => {
    const bookingAppUser = window.localStorage.getItem('booking_app_user')
    if (!bookingAppUser) {
      setIsUserAuthenticated(false)
      setLoading(false)
      window.localStorage.removeItem('booking_app_user')
      await axiosInstance.post('/user/logout')
    } else {
      const { id, username } = JSON.parse(bookingAppUser)
      try {
        const res = await axiosInstance.get(`/user/verify/${id}/${username}`)
        if (res.status === 200) {
          setIsUserAuthenticated(true)
          setLoading(false)
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Unknown error'
        setErrors(errorMessage)
      }
    }
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors('')
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  return (
    <AuthContext.Provider value={{ login, logout, checkLogin, user, isUserAuthenticated, setIsUserAuthenticated, errors, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

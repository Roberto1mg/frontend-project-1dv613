import { createContext, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import PropTypes from 'prop-types'

const AuthContext = createContext()

// Checks for the validity of the JWT.
const isTokenValid = (token) => {
  try {
    const { exp } = jwtDecode(token)
    if (exp * 1000 < Date.now()) {
      return false
    }
    return true
  } catch (error) {
    return false
  }
}

export const AuthProvider = ({ children }) => {
  localStorage.removeItem('searchValue')

  // Sets the auth state for the application.
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem('jwt')
    return token ? isTokenValid(token) : false
  })

  // Checks the validity of the JWT - logs out if not valid.
  const checkTokenValidity = () => {
    const token = localStorage.getItem('jwt')
    if (token && !isTokenValid(token)) {
      logout()
      setTimeout(() => {
        toast.info('Session expired. Please log in again.')
      }, 10)
    }
  }

  const login = (req) => {
    localStorage.setItem('jwt', req.access_token)
    localStorage.setItem('username', req.session.username)
    localStorage.setItem('firstName', req.session.firstName)
    localStorage.setItem('lastName', req.session.lastName)
    localStorage.setItem('email', req.session.email)
    setIsLoggedIn(true)
  }

  const logout = () => {
    localStorage.clear()
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, checkTokenValidity }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useAuth = () => useContext(AuthContext)

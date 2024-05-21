import { createContext, useContext, useState } from 'react'
import {Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('jwt') ? true : false)

  const login = () => {
    setIsLoggedIn(true)
  }

  const logout = () => {
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Navigates to the login page if the user needs to be authorized to view a page.
export const PrivateRoute = ({ element }) => {
  const { isLoggedIn } = useAuth()

  return isLoggedIn ? element : <Navigate to="/login" />
}

// Navigates to the profile page if the user needs to be unauthorized to view a page.
export const PublicRoute = ({ element }) => {
  const { isLoggedIn } = useAuth()

  return isLoggedIn ? <Navigate to="/profile" replace /> : element
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired,
}

PublicRoute.propTypes = {
  element: PropTypes.node.isRequired,
}

export const useAuth = () => useContext(AuthContext)

import { useLayoutEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import PropTypes from 'prop-types'

// Checks for the validity of the JWT.
const CheckTokenRoute = ({ element }) => {
  const { checkTokenValidity } = useAuth()

  useLayoutEffect(() => {
    checkTokenValidity()
  })

  return element
}

// Navigates to the login page if the user needs to be authorized to view a page.
const PrivateRoute = ({ element }) => {
  const { isLoggedIn, checkTokenValidity } = useAuth()

  useLayoutEffect(() => {
    checkTokenValidity()
  })

  return isLoggedIn ? element : <Navigate to="/login" />
}

// Navigates to the profile page if the user needs to be unauthorized to view a page.
const PublicRoute = ({ element }) => {
  const { isLoggedIn } = useAuth()

  return isLoggedIn ? <Navigate to="/profile" replace /> : element
}

CheckTokenRoute.propTypes = {
  element: PropTypes.node.isRequired,
}

PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired,
}

PublicRoute.propTypes = {
  element: PropTypes.node.isRequired,
}

export { CheckTokenRoute, PrivateRoute, PublicRoute }

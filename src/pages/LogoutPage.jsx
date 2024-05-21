import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../utils/AuthContext'
import apiUrl from '../utils/APIConfig'

const LogoutPage = () => {
  const { logout } = useAuth()
  const username = localStorage.getItem('username')
  const navigate = useNavigate()

  const handleLogout = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`${apiUrl}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to log out')
      }

      localStorage.removeItem('jwt')
      localStorage.removeItem('username')
      localStorage.removeItem('firstName')
      localStorage.removeItem('lastName')
      localStorage.removeItem('email')

      toast.success('You have successfully logged out')

      logout()

      return navigate('/')
    } catch (error) {
      toast.error('Failed to log out')
    } 
  }

  return (
    <div className="form-container">
      <form className="logout-form" onSubmit={handleLogout}>
        <h2>Are you sure you want to log out, {username}?</h2>
        <button className="logout-button" type='submit'>Logout</button>
      </form>
    </div>
  )
}

export default LogoutPage

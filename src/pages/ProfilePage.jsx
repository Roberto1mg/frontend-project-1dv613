import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../utils/AuthContext'
import apiUrl from '../utils/APIConfig'

const ProfilePage = () => {
  const { isLoggedIn, logout } = useAuth()
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

      toast.success('You have now logged out')

      logout()

      return navigate('/')
    } catch (error) {
      toast.error('Failed to log out')
    } 
  }

  if (!isLoggedIn) {
    return (
      <h1>You are not logged in!!!</h1>
    )
  }

  return (
    <>
      <h1>Welcome to your profile {username}!</h1>

      <form onSubmit={handleLogout}>
        <h2>Are you sure you want to log out, {username}?</h2>
        <button type='submit'>Logout</button>
      </form>
    </>
  )
}

export default ProfilePage

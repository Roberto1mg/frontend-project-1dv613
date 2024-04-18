import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../utils/AuthContext'
import './RegisterPage.css'

const LoginPage = () => {
  const { login } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const authorizeUser = {
      username,
      password,
    }

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authorizeUser),
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to log in')
      }

      const responseData = await response.json()
      console.log(responseData)

      // Store JWT token ans username in local storage
      localStorage.setItem('jwt', responseData.access_token)
      localStorage.setItem('username', responseData.session.username)

      // Clear input fields
      setUsername('')
      setPassword('')

      login()
  
      toast.success('You are now logged in')

      return navigate('/profile')
    } catch (error) {
      toast.error('Failed to log in')
    } 
  }

  return (
    <section>
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <h2>Log in to your account!</h2>

            <div>
              <label>Username:</label>
              <input className="input-form" type='text' id='username' name='username' placeholder='Type your username here!' required value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>

            <div>
              <label>Password:</label>
              <input className="input-form" type='password' id='password' name='password' placeholder='Type your password here!' required value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <button type='submit'>Log in</button>

            <p>
              Not registered? <Link to='/register'>Sign up here!</Link>
            </p>

          </form>
        </div>
      </div>
    </section>
  )
}

export default LoginPage

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import apiUrl from '../utils/APIConfig'
import './RegisterPage.css'

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const submitForm = async (e) => {
    e.preventDefault()

    const newUser = {
      firstName,
      lastName,
      email,
      username,
      password,
    }

    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
      })
  
      if (!response.ok) {
        throw new Error('Failed to register account')
      }
  
      toast.success('Account Registered Successfully')
  
      return navigate('/login')
  
    } catch (error) {
      toast.error('Failed to register account')
    } 
  }

  return (
    <section>
      <div>
        <div>
          <form onSubmit={submitForm}>
            <h2>Register a new account here!</h2>

            <div>
            <label>First name:</label>
              <input className="input-form" type='text' id='firstName' name='firstName' placeholder='Type your first name here!' required value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            </div>

            <div>
              <label>Last name:</label>
              <input className="input-form" type='text' id='lastName' name='lastName' placeholder='Type your last name here!' required value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            </div>

            <div>
              <label>Email:</label>
              <input className="input-form" type='email' id='email' name='email' placeholder='Type your email here!' required value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div>
              <label>Username:</label>
              <input className="input-form" type='text' id='username' name='username' placeholder='Type your username here!' required value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>

            <div>
              <label>Password:</label>
              <input className="input-form" type='password' id='password' name='password' placeholder='Type your password here!' required value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <button type='submit'>Register</button>

            <p>
              Already have an account? <Link to='/login'>Log in here!</Link>
            </p>

          </form>
        </div>
      </div>
    </section>
  )
}

export default RegisterPage

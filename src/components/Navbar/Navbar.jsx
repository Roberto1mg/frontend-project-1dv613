import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../utils/AuthContext'
import PropTypes from 'prop-types'
import logo from '../../assets/images/logo.png'
import SearchInput from '../SearchInput/SearchInput'
import './Navbar.css'

const Navbar = ({ handleFetchArtistData }) => {
  const { isLoggedIn } = useAuth()
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  console.log("Searching for (Navbar):", query)

  const handleSearch = (e) => {
    e.preventDefault()
    handleFetchArtistData(query)
    setQuery('')
    navigate('/artist')
  }

  return (
    <nav className="navbar">

      <div className="left-section">
        <div className="title-input-container">
          <Link to="/" className="nav-title">StarStage<img className="logo" src={logo} alt='Star logo' /></Link>
          <form onSubmit={handleSearch}>
            <SearchInput value={query} onChange={(e) => setQuery(e.target.value)} onSubmit={handleSearch} />
          </form>
        </div>
      </div>

      <div className="right-section">
        <ul className="nav-list">
          <li><Link to="/artist" className="nav-link">Artists</Link></li>
          <li><Link to="/festival" className="nav-link">Festivals</Link></li>
          <li><Link to="/contact" className="nav-link">Contact Us</Link></li>
      {isLoggedIn ? (
        <>
          <li><Link to="/profile" className="nav-link">Profile</Link></li>
        </>
      ) : (
        <>
          <li><Link to="/login" className="nav-link">Log in</Link></li>
          <li><Link to="/register" className="nav-link">Create account</Link></li>
        </>
      )}
        </ul>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  handleFetchArtistData: PropTypes.func.isRequired,
}

export default Navbar

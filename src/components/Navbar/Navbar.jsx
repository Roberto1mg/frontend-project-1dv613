import { Link } from 'react-router-dom'
import { useAuth } from '../../utils/AuthContext'
import logo from '../../assets/images/logo.png'
import SearchInput from '../SearchInput/SearchInput'
import './Navbar.css'

const Navbar = () => {
  const { isLoggedIn } = useAuth()

  return (
    <nav className="navbar">

      <div className="left-section">
        <div className="title-input-container">
          <Link to="/" className="nav-title">StarStage<img className="logo" src={logo} alt='Star logo' /></Link>
          <SearchInput />
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

export default Navbar

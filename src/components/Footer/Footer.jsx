import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer>
      <Link to='/about' className="footer-button">
        About Us
      </Link>
    </footer>
  )
}

export default Footer

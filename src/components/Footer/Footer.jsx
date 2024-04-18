import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer>
      <button>
        <Link to='/contact'>Contact Us</Link>
      </button>
    </footer>
  )
}

export default Footer

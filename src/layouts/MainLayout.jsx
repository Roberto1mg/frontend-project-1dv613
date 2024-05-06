import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import PropTypes from 'prop-types'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import 'react-toastify/dist/ReactToastify.css'

const MainLayout = ({ handleFetchArtistData }) => {
  console.log('MainLayout created')
  return (
    <>
      <Navbar handleFetchArtistData={handleFetchArtistData} />
      <Outlet />
      <ToastContainer />
      <Footer />
    </>
  )
}

MainLayout.propTypes = {
  handleFetchArtistData: PropTypes.func.isRequired,
}

export default MainLayout

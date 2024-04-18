import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import 'react-toastify/dist/ReactToastify.css'

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <ToastContainer />
      <Footer />
    </>
  )
}

export default MainLayout

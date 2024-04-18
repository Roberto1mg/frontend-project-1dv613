import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './utils/AuthContext'
import MainLayout from './layouts/MainLayout'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import ArtistPage from './pages/ArtistPage'
import ContactPage from './pages/ContactPage'
import FestivalPage from './pages/FestivalPage'
import '../public/style.css'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />} >
            <Route index path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path='/artist' element={<ArtistPage />} />
            <Route path="/festival" element={<FestivalPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

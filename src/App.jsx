import { useState } from 'react'
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
import ArtistDetailPage from './pages/ArtistDetailPage'
import '../public/style.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleFetchArtistData = (e) => {
    setSearchQuery(e)
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout handleFetchArtistData={handleFetchArtistData} />} >
            <Route index path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path='/artist' element={<ArtistPage searchQuery={searchQuery} />} />
            <Route path="/artist/:artistID" element={<ArtistDetailPage />} />
            <Route path="/festival" element={<FestivalPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

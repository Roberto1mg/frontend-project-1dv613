import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './utils/AuthContext'
import MainLayout from './layouts/MainLayout'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import SearchPage from './pages/SearchPage'
import ContactPage from './pages/ContactPage'
import FestivalPage from './pages/FestivalPage'
import ArtistPage from './pages/ArtistPage'
import EventPage from './pages/EventPage'
import ErrorUnexpectedPage from './pages/Errors/ErrorUnexpectedPage'
import ErrorNotFoundPage from './pages/Errors/ErrorNotFoundPage'
import ErrorUnauthorizedPage from './pages/Errors/ErrorUnauthorizedPage'
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
            <Route path='/artist/' element={<SearchPage />} />
            <Route path="/artist/:artistID" element={<ArtistPage />} />
            <Route path="/event/:eventID" element={<EventPage />} />
            <Route path="/festival" element={<FestivalPage />} />
            <Route path='/error' element={<ErrorUnexpectedPage />} />
            <Route path='/unauthorized' element={<ErrorUnauthorizedPage />} />
            <Route path='*' element={<ErrorNotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

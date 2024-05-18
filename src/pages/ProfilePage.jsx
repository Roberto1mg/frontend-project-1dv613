import { useEffect, useState } from 'react'
import ArtistInfo from '../components/ArtistInfo/ArtistInfo'
import apiUrl from '../utils/APIConfig'

const ProfilePage = () => {
  const username = localStorage.getItem('username')
  const firstName = localStorage.getItem('firstName')
  const lastName = localStorage.getItem('lastName')
  const email = localStorage.getItem('email')
  const jwt = localStorage.getItem('jwt')

  const [artists, setArtists] = useState([])

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch(`${apiUrl}/favorites/artists`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
          },
        })

        const handledData = await response.json()
  
        if (!response.ok) {
          throw new Error('Failed to fetch artists')
        }

        setArtists(handledData.artists)
      } catch (error) {
        console.error('Error fetching artists:', error)
      }
    }
    fetchArtists()
  }, [jwt])

  return (
    <>
      <div className="form-container">
        <h2 className="center-text">Welcome to your profile, {username}!</h2>
        <div className="profile-info">
          <p><span className="label">First Name:</span> {firstName}</p>
          <p><span className="label">Last Name:</span> {lastName}</p>
          <p><span className="label">Username:</span> {username}</p>
          <p><span className="label">Email:</span> {email}</p>
        </div>
      </div>

      <h3 className="center-text">Favorited Artists</h3>
      {artists.length > 0 ? (
        <div className="artist-container">
          {artists.map((artist) => (
            <ArtistInfo key={artist.id} artist={artist} />
          ))}
        </div>
      ) : (
        <p className="center-text">No favorited artists found yet.</p>
      )}
    </>
  )
}

export default ProfilePage

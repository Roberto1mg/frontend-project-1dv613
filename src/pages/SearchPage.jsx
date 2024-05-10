import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import apiUrl from '../utils/APIConfig'
import ArtistInfo from '../components/ArtistInfo/ArtistInfo'
import Spinner from '../components/Spinner/Spinner'
import PropTypes from 'prop-types'

const ArtistPage = ({ searchQuery }) => {
  const jwt = localStorage.getItem('jwt')
  const [artistData, setArtistData] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetchArtist = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/artists/artist/${searchQuery}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
      })

      const responseData = await response.json()
      console.log(responseData)

      if (!response.ok) {
        navigate('/error')
        throw new Error('Failed to fetch artist data')
      }

      setArtistData(responseData)
    } catch (error) {
      console.error('Error fetching artist data:', error)
    } finally {
      setLoading(false)
    }
  }, [searchQuery, jwt, navigate])

  useEffect(() => {
    if (searchQuery) {
      setLoading(true)
      fetchArtist()
    }
  }, [searchQuery, fetchArtist])

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <h3 className="center-text">Results for: {searchQuery}</h3>
      <div className="artist-container">
        {artistData && artistData.artists.length > 0 ? (
          artistData.artists.map(artist => (
            <ArtistInfo key={artist.id} artist={artist} />
          ))
        ) : (
          <p className="center-text">No artist found by that name.</p>
        )}
      </div>
    </>
  )
}

ArtistPage.propTypes = {
  searchQuery: PropTypes.string.isRequired,
}

export default ArtistPage

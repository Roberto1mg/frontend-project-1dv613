import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import apiUrl from '../utils/APIConfig'
import ArtistInfo from '../components/ArtistInfo/ArtistInfo'
import Spinner from '../components/Spinner/Spinner'
import PropTypes from 'prop-types'
import './RegisterPage.css'

const ArtistPage = ({ searchQuery }) => {
  const jwt = localStorage.getItem('jwt')
  const [artistData, setArtistData] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const handleArtistClick = (artistID) => {
    navigate(`/artist/${artistID}`)
  }

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
        throw new Error('Failed to fetch artist data')
      }

      setArtistData(responseData)
    } catch (error) {
      console.error('Error fetching artist data:', error)
    } finally {
      setLoading(false)
    }
  }, [searchQuery, jwt])

  useEffect(() => {
    if (searchQuery) {
      fetchArtist()
    }
  }, [searchQuery, fetchArtist])

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <h1>Artist Page</h1>
      <div>
        {artistData && artistData.artists.map(artist => (
          <ArtistInfo key={artist.id} artist={artist} onClick={handleArtistClick} />
        ))}
      </div>
    </>
  )
}

ArtistPage.propTypes = {
  searchQuery: PropTypes.string.isRequired,
}

export default ArtistPage

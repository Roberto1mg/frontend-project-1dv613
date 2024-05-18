import { useEffect, useState, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import apiUrl from '../utils/APIConfig'
import ArtistInfo from '../components/ArtistInfo/ArtistInfo'
import Spinner from '../components/Spinner/Spinner'

const SearchPage = () => {
  const [artistData, setArtistData] = useState([])
  const [loading, setLoading] = useState(true)
  const jwt = localStorage.getItem('jwt')
  const location = useLocation()
  const searchValue = location.state?.searchValue
  const navigate = useNavigate()

  const fetchArtist = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/artists/artists/${searchValue}`, {
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
  }, [searchValue, jwt, navigate])

  useEffect(() => {
    if (searchValue) {
      setLoading(true)
      fetchArtist()
    }
  }, [searchValue, fetchArtist])

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <h3 className="center-text">Results for: {searchValue}</h3>
        {artistData && artistData.artists.length > 0 ? (
          <div className="artist-container">
          {artistData.artists.map(artist => (
            <ArtistInfo key={artist.id} item={artist} type={'artist'} />
          ))}
          </div>
        ) : (
          <p className="center-text">Sorry, no artist found by that name.</p>
        )}
    </>
  )
}

export default SearchPage

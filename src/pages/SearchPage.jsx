import { useEffect, useState, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import apiUrl from '../utils/APIConfig'
import ArtistList from '../components/ArtistList/ArtistList'
import Spinner from '../components/Spinner/Spinner'

const SearchPage = () => {
  const [artistData, setArtistData] = useState([])
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const searchValue = location.state?.searchValue || localStorage.getItem('searchValue')
  const navigate = useNavigate()

  const fetchArtist = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/artists/artists/${searchValue}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })

      const responseData = await response.json()

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
  }, [searchValue, navigate])

  useEffect(() => {
    if (searchValue) {
      localStorage.setItem('searchValue', searchValue)
      setLoading(true)
      fetchArtist()
    }
  }, [searchValue, fetchArtist])

  if (!searchValue) {
    return (
      <h3 className="center-text">Search for an artist or festival and see the results here!</h3>
    )
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <ArtistList 
        artists={artistData.artists}
        heading={`Results for: ${searchValue}`}
        headingSize={2}
        noArtistMessage="Sorry, no artist found by that name."
      />
    </>
  )
}

export default SearchPage

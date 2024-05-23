import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import ArtistList from '../components/ArtistList/ArtistList'
import EventList from '../components/EventList/EventList'
import apiUrl from '../utils/APIConfig'
import Spinner from '../components/Spinner/Spinner'

const HomePage = () => {
  const [popularArtists, setPopularArtists] = useState([])
  const [upcomingEvents, setupcomingEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetchPopularArtists = useCallback(async () => {
    try {
      const [artistsResponse, eventResponse] = await Promise.all([
        fetch(`${apiUrl}/artists/artists/+`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        }),
        fetch(`${apiUrl}/artists/events/+`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        }),
      ])

      const artistsData = await artistsResponse.json()
      const eventData = await eventResponse.json()

      if (!artistsResponse.ok || !eventResponse.ok) {
        navigate('/error')
        throw new Error('Failed to fetch popular artists')
      }

      setPopularArtists(artistsData)
      setupcomingEvents(eventData)
    } catch (error) {
      console.error('Error fetching artist data:', error)
    } finally {
      setLoading(false)
    }
  }, [navigate])

  useEffect(() => {
    fetchPopularArtists()
  }, [fetchPopularArtists])

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <h1 className="center-text">Discover Artists</h1>
      <p className="center-text">Explore talented artists and musicians and see all their upcoming events here.</p>

      <ArtistList 
        artists={popularArtists.artists.slice(0, 10)} 
        heading="Popular Artists" 
        headingSize={2}
      />

      <EventList 
        events={upcomingEvents.events.slice(0, 10)} 
        heading="Upcoming events" 
        headingSize={2}
      />
    </>
  )
}

export default HomePage

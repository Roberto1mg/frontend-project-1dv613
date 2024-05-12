import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import ArtistInfo from '../components/ArtistInfo/ArtistInfo'
import EventInfo from '../components/EventInfo/EventInfo'
import apiUrl from '../utils/APIConfig'
import Spinner from '../components/Spinner/Spinner'

const HomePage = () => {
  const [popularArtists, setPopularArtists] = useState([])
  const [upcomingEvents, setupcomingEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const jwt = localStorage.getItem('jwt')

  const fetchPopularArtists = useCallback(async () => {
    try {
      const [artistsResponse, eventResponse] = await Promise.all([
        fetch(`${apiUrl}/artists/artists/+`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
          },
        }),
        fetch(`${apiUrl}/artists/events/+`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
          },
        }),
      ])

      const artistsData = await artistsResponse.json()
      console.log(artistsData)

      const eventData = await eventResponse.json()
      console.log(eventData)

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
  }, [jwt, navigate])

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

      <div className="popular-artists">
        <h2 className="center-text">Popular Artists</h2>
        <div className="artist-container">
          {popularArtists.artists.slice(0, 10).map(artist => (
            <ArtistInfo key={artist.id} artist={artist} />
          ))}
        </div>
      </div>

        <div className="upcoming-events">
          <h2 className="center-text">Upcoming events:</h2>
          <div className="event-container-homepage">
            {upcomingEvents.events.slice(0, 10).map(event => (
              <EventInfo key={event.id} event={event} />
            ))}
        </div>
      </div>
    </>
  )
}

export default HomePage

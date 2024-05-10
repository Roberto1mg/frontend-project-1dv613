import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import apiUrl from '../utils/APIConfig'
import EventInfo from '../components/EventInfo/EventInfo'
import ArtistInfo from '../components/ArtistInfo/ArtistInfo'
import Spinner from '../components/Spinner/Spinner'

const ArtistDetailPage = () => {
  const { eventID } = useParams()
  const [eventsData, setEventsData] = useState([])
  const [loading, setLoading] = useState(true)
  const jwt = localStorage.getItem('jwt')
  const navigate = useNavigate()

  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/artists/event/${eventID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
      })

      const eventData = await response.json()
      console.log(eventData)

      if (!eventData.success) {
        navigate('/404')
        return
      } else 
      if (!response.ok) {
        navigate('/error')
        throw new Error('Failed to fetch events data')
      }

      setEventsData(eventData)
    } catch (error) {
      console.error('Error fetching events data:', error)
    } finally {
      setLoading(false)
    }
  }, [eventID, jwt, navigate])

  useEffect(() => {
    fetchEvents()
  }, [eventID, fetchEvents])

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <div className="event-container">
        <EventInfo event={eventsData.events} />

        <h4 className="center-text">Performing in - {eventsData.events.name}:</h4>
        <div className="artist-container">
          {eventsData.artists.map(artist => (
            <ArtistInfo key={artist.id} artist={artist} />
          ))}
        </div>
      </div>
    </>
  )
}

export default ArtistDetailPage

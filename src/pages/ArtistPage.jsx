import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import apiUrl from '../utils/APIConfig'
import ArtistInfo from '../components/ArtistInfo/ArtistInfo'
import EventInfo from '../components/EventInfo/EventInfo'
import Spinner from '../components/Spinner/Spinner'

const ArtistDetailPage = () => {
  const { artistID } = useParams()
  const [eventsData, setEventsData] = useState([])
  const [loading, setLoading] = useState(true)
  const jwt = localStorage.getItem('jwt')
  const navigate = useNavigate()

  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/artists/events/${artistID}`, {
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
  }, [artistID, jwt, navigate])

  useEffect(() => {
    fetchEvents()
  }, [artistID, fetchEvents])

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <div className="event-container">
      <ArtistInfo artist={eventsData.artists} />
      {eventsData && eventsData.events && eventsData.events.length > 0 ? (
        <>
          <h4 className="center-text">Future events:</h4>
          {eventsData.events.map(event => (
            <EventInfo key={event.id} event={event} />
          ))}
        </>
      ) : (
        <>
          <p className="center-text">{eventsData.artists.name} currently has no future events planned.</p>
        </>
      )}
      </div>
    </>
  )
}

export default ArtistDetailPage

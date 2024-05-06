import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import apiUrl from '../utils/APIConfig'
import EventInfo from '../components/EventInfo/EventInfo'
import Spinner from '../components/Spinner/Spinner'

const ArtistDetailPage = () => {
  const { artistID } = useParams()
  const jwt = localStorage.getItem('jwt')
  const [eventsData, setEventsData] = useState([])
  const [loading, setLoading] = useState(true)

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

      if (!response.ok) {
        throw new Error('Failed to fetch events data')
      }

      setEventsData(eventData)
    } catch (error) {
      console.error('Error fetching events data:', error)
    } finally {
      setLoading(false)
    }
  }, [artistID, jwt])

  useEffect(() => {
    fetchEvents()
  }, [artistID, fetchEvents])

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      {eventsData && eventsData.events && eventsData.events.length > 0 ? (
        <>
          <h1>{eventsData.name}</h1>
          {eventsData.events.map(event => (
            <EventInfo key={event.id} event={event} />
          ))}
        </>
      ) : (
        <>
          <h1>{eventsData.name}</h1>
          <p>No future events</p>
        </>
      )}
    </>
  )
}

export default ArtistDetailPage

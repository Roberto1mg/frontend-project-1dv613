import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import apiUrl from '../utils/APIConfig'
import ArtistInfo from '../components/ArtistInfo/ArtistInfo'
import ArtistList from '../components/ArtistList/ArtistList'
import Spinner from '../components/Spinner/Spinner'

const EventPage = () => {
  const { eventID } = useParams()
  const [eventsData, setEventsData] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/artists/event/${eventID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })

      const eventData = await response.json()

      if (response.status === 404) {
        navigate('/404')
        return
      } else if (!response.ok) {
        navigate('/error')
        throw new Error('Failed to fetch events data')
      }

      setEventsData(eventData)
    } catch (error) {
      console.error('Error fetching events data:', error)
    } finally {
      setLoading(false)
    }
  }, [eventID, navigate])

  useEffect(() => {
    fetchEvents()
  }, [eventID, fetchEvents])

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <ArtistInfo item={eventsData.events} type={'event'} />

      <ArtistList 
        artists={eventsData.artists} 
        heading={`Performing in - ${eventsData.events.name}:`}
        headingSize={4}
      />
    </>
  )
}

export default EventPage

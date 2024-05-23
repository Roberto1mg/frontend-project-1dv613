import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import apiUrl from '../utils/APIConfig'
import ArtistInfo from '../components/ArtistInfo/ArtistInfo'
import EventList from '../components/EventList/EventList'
import Spinner from '../components/Spinner/Spinner'

const ArtistPage = () => {
  const { artistID } = useParams()
  const [eventsData, setEventsData] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/artists/artist/${artistID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
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
  }, [artistID, navigate])

  useEffect(() => {
    fetchEvents()
  }, [artistID, fetchEvents])

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <ArtistInfo item={eventsData.artists} type={'artist'} />

      <EventList 
        events={eventsData.events} 
        heading="Future events:"
        headingSize={3}
        noEventMessage={`${eventsData.artists.name} currently has no future events planned`}
      />
    </>
  )
}

export default ArtistPage

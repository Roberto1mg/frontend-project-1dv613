import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import apiUrl from '../utils/APIConfig'
import ArtistInfo from '../components/ArtistInfo/ArtistInfo'
import Spinner from '../components/Spinner/Spinner'

const ArtistPage = () => {
  const { artistID } = useParams()
  const [eventsData, setEventsData] = useState([])
  const [loading, setLoading] = useState(true)
  const jwt = localStorage.getItem('jwt')
  const navigate = useNavigate()

  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/artists/artist/${artistID}`, {
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
      <ArtistInfo item={eventsData.artists} type={'artist'} />
      {eventsData && eventsData.events && eventsData.events.length > 0 ? (
        <>
          <h3 className="center-text">Future events:</h3>
          <div className="artist-container">
          {eventsData.events.map(event => (
              <ArtistInfo key={event.id} item={event} type={'event'} />
          ))}
          </div>
        </>
      ) : (
        <>
          <p className="center-text">{eventsData.artists.name} currently has no future events planned.</p>
        </>
      )}
    </>
  )
}

export default ArtistPage

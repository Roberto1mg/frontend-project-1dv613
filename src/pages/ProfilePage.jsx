import { useEffect, useState, useCallback } from 'react'
import ProfileInfo from '../components/ProfileInfo/ProfileInfo'
import ArtistList from '../components/ArtistList/ArtistList'
import EventList from '../components/EventList/EventList'
import PaginationButton from '../components/PaginationButton/PaginationButton'
import apiUrl from '../utils/APIConfig'

const ProfilePage = () => {
  const [currentArtists, setCurrentArtists] = useState({ artists: [], pagination: {} })
  const [currentEvents, setCurrentEvents] = useState({ events: [], pagination: {} })
  const [currentArtistsPage, setCurrentArtistsPage] = useState(1)
  const [currentEventsPage, setCurrentEventsPage] = useState(1)
  const jwt = localStorage.getItem('jwt')

  // Fetches the page for the artists (default page 1).
  const fetchArtists = useCallback(async (page = 1) => {
    try {
      const artistsResponse = await fetch(`${apiUrl}/favorites/artists?page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
      })

      const artistsData = await artistsResponse.json()

      if (!artistsResponse.ok) {
        throw new Error('Failed to fetch artists')
      }

      // Updates the list of artists.
      setCurrentArtists(prevState => ({
        ...prevState,
        artists: [
          ...prevState.artists,
          ...artistsData.artists.filter(artist => !prevState.artists.some(existingArtist => existingArtist.id === artist.id))
        ],
        pagination: artistsData.pagination
      }))
      setCurrentArtistsPage(page)
    } catch (error) {
      console.error('Error fetching artists:', error)
    }
  }, [jwt])

  // Fetches the page for the events (default page 1).
  const fetchEvents = useCallback(async (page = 1) => {
    try {
      const eventResponse = await fetch(`${apiUrl}/favorites/events?page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
      })

      const eventData = await eventResponse.json()

      if (!eventResponse.ok) {
        throw new Error('Failed to fetch events')
      }

      // Updates the list of events.
      setCurrentEvents(prevState => ({
        ...prevState,
        events: [
          ...prevState.events,
          ...eventData.events.filter(event => !prevState.events.some(existingEvent => existingEvent.id === event.id))
        ],
        pagination: eventData.pagination
      }))
      setCurrentEventsPage(page)
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }, [jwt])

  useEffect(() => {
    fetchArtists(currentArtistsPage)
  }, [fetchArtists, jwt, currentArtistsPage])

  useEffect(() => {
    fetchEvents(currentEventsPage)
  }, [fetchEvents, jwt, currentEventsPage])

  const handleShowMoreArtists = () => {
    if (currentArtists.pagination.hasNextPage) {
      fetchArtists(currentArtistsPage + 1)
    }
  }

  const handleShowMoreEvents = () => {
    if (currentEvents.pagination.hasNextPage) {
      fetchEvents(currentEventsPage + 1)
    }
  }

  return (
    <>
      <ProfileInfo />

      <ArtistList 
        artists={currentArtists.artists}
        heading="Favorited Artists"
        headingSize={3}
        noArtistMessage="No favorited artists found."
      />

      {/* Display the button only if there are more pages with artists */}
      {currentArtists.pagination.hasNextPage &&
      <PaginationButton
        onPageChange={handleShowMoreArtists} 
        hasNextPage={currentArtists.pagination.hasNextPage} 
      />}

      <EventList 
        events={currentEvents.events}
        heading="Favorited Events"
        headingSize={3}
        noEventMessage="No favorited events found."
      />

      {/* Display the button only if there are more pages with events */}
      {currentEvents.pagination.hasNextPage &&
      <PaginationButton
        onPageChange={handleShowMoreEvents} 
        hasNextPage={currentEvents.pagination.hasNextPage} 
      />}
    </>
  )
}

export default ProfilePage

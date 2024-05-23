// import { useEffect, useState, useCallback } from 'react'
// import ProfileInfo from '../components/ProfileInfo/ProfileInfo'
// import ArtistList from '../components/ArtistList/ArtistList'
// import EventList from '../components/EventList/EventList'
// import PaginationButton from '../components/PaginationButton/PaginationButton'
// import apiUrl from '../utils/APIConfig'

// const ProfilePage = () => {
//   const [currentArtists, setCurrentArtists] = useState({ artists: [], pagination: {} })
//   const [events, setEvents] = useState([])
//   const [currentPage, setCurrentPage] = useState(1)
//   const jwt = localStorage.getItem('jwt')

//   const fetchArtists = useCallback(async (page = 1) => {
//     try {
//       const [artistsResponse, eventResponse] = await Promise.all([
//         fetch(`${apiUrl}/favorites/artists?page=${page}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${jwt}`
//           },
//         }),
//         fetch(`${apiUrl}/favorites/events/`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${jwt}`
//           },
//         }),
//       ])

//       const artistsData = await artistsResponse.json()
//       const eventData = await eventResponse.json()
//       console.log(eventData)

//       if (!artistsResponse.ok || !eventResponse.ok) {
//         throw new Error('Failed to fetch artists or events')
//       }

//       setCurrentArtists(prevState => ({
//         ...prevState,
//         artists: [
//           ...prevState.artists,
//           ...artistsData.artists.filter(artist => !prevState.artists.some(existingArtist => existingArtist.id === artist.id))
//         ],
//         pagination: artistsData.pagination
//       }))
//       setEvents(eventData.events)
//       setCurrentPage(page)
//     } catch (error) {
//       console.error('Error fetching artists:', error)
//     }
//   }, [jwt])

//   useEffect(() => {
//     fetchArtists(currentPage)
//   }, [fetchArtists, jwt, currentPage])

//   const handleShowMore = () => {
//     if (currentArtists.pagination.hasNextPage) {
//       fetchArtists(currentPage + 1)
//     }
//   }

//   return (
//     <>
//       <ProfileInfo />

//       <ArtistList 
//         artists={currentArtists.artists}
//         heading="Favorited Artists"
//         headingSize={3}
//         noArtistMessage="No favorited artists found."
//       />

//       <PaginationButton
//         onPageChange={handleShowMore} 
//         hasNextPage={currentArtists.pagination.hasNextPage} 
//       />

//       <EventList 
//         events={events}
//         heading="Favorited Events"
//         headingSize={3}
//         noArtistMessage="No favorited events found."
//       />
//     </>
//   )
// }

// export default ProfilePage



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

      <PaginationButton
        onPageChange={handleShowMoreArtists} 
        hasNextPage={currentArtists.pagination.hasNextPage} 
      />

      <EventList 
        events={currentEvents.events}
        heading="Favorited Events"
        headingSize={3}
        noEventMessage="No favorited events found."
      />

      <PaginationButton
        onPageChange={handleShowMoreEvents} 
        hasNextPage={currentEvents.pagination.hasNextPage} 
      />
    </>
  )
}

export default ProfilePage

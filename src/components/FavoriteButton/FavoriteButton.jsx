import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import apiUrl from '../../utils/APIConfig'
import './FavoriteButton.css'

const FavoriteButton = ({ artist, type }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const jwt = localStorage.getItem('jwt')
  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      // Toggle the favorite state
      setIsFavorite(!isFavorite)

      // Perform the POST request internally if needed
      const response = await fetch(`${apiUrl}/favorites/${type}/${artist.id}`, {
        method: isFavorite ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify(artist),
      })

      const handledData = await response.json()

      if (!handledData.success) {
        toast.info(handledData.message)
        return
      } else if (!response.ok) {
        navigate('/error')
        throw new Error('Failed to favorite/unfavorite the artist')
      }

      if (isFavorite) {
        toast.success('Artist removed from favorites successfully')
      } else {
        toast.success('Artist favorited successfully')
      }

      console.log(`${type} ${artist.id} ${isFavorite ? 'removed from' : 'added to'} favorites`)
    } catch (error) {
      console.error('Error handling favorite:', error)
    }
  }

  return (
    <button className={`favorite-button ${isFavorite ? 'favorited' : ''}`} onClick={handleClick}>
      <FontAwesomeIcon icon={faHeart} className="heart-icon" />
    </button>
  )
}

FavoriteButton.propTypes = {
  artist: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    spotify: PropTypes.string,
  }).isRequired,
  type: PropTypes.oneOf(['artist', 'event']).isRequired,
}

export default FavoriteButton

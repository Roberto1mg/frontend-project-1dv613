import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import apiUrl from '../../utils/APIConfig'
import './FavoriteButton.css'

const FavoriteButton = ({ item, type }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const jwt = localStorage.getItem('jwt')
  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      // Toggle the favorite state
      setIsFavorite(!isFavorite)

      // POST or DELETE request based on state
      const response = await fetch(`${apiUrl}/favorites/${type}/${item.id}`, {
        method: isFavorite ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify(item),
      })

      const handledData = await response.json()

      if (!handledData.success) {
        toast.info(handledData.message)
        return
      } else if (!response.ok) {
        navigate('/error')
        throw new Error('Failed to favorite/unfavorite the artist')
      }

      const itemType = type === 'artist' ? 'Artist' : 'Event'

      if (isFavorite) {
        toast.success(`${itemType} removed from favorites successfully`)
      } else {
        toast.success(`${itemType} favorited successfully`)
      }

      console.log(`${type} ${item.name} ${isFavorite ? 'removed from' : 'added to'} favorites`)
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
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }),
  type: PropTypes.oneOf(['artist', 'event']).isRequired,
}

export default FavoriteButton

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../utils/AuthContext'
import PropTypes from 'prop-types'
import FavoriteButton from '../FavoriteButton/FavoriteButton'
import './ArtistInfo.css'

const ArtistInfo = ({ item, type }) => {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  const handleClick = (id) => {
    navigate(`/${type}/${id}`)
  }

  return (
    <div className="item-card">
      {type === 'event' ? (
        <>
          <img src={item.image} alt={item.name} className="item-image" onClick={() => handleClick(item.id)} />
          <h2 className="item-title">{item.name}</h2>
          {isLoggedIn && <FavoriteButton item={item} type={type} />}
          <p className="item-location">{item.location}</p>
          <p className="item-date">Starts: {item.startDate}</p>
          <p className="item-date">Ends: {item.endDate}</p>
        </>
      ) : (
        <>
          <img src={item.image} alt={item.name} className="item-image" onClick={() => handleClick(item.id)} />
          <h2 className="item-title">{item.name}</h2>
          {isLoggedIn && <FavoriteButton item={item} type={type} />}
          {item.spotify && (
            <div className="spotify-link">
              <a href={item.spotify} target="_blank" rel="noopener noreferrer">Listen on Spotify</a>
            </div>
          )}
        </>
      )}
    </div>
  )
}

ArtistInfo.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    spotify: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    location: PropTypes.string,
  }).isRequired,
  type: PropTypes.oneOf(['artist', 'event']).isRequired,
}

export default ArtistInfo

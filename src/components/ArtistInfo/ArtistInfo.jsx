import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import FavoriteButton from '../FavoriteButton/FavoriteButton'
import './ArtistInfo.css'

const ArtistInfo = ({ artist }) => {
  const navigate = useNavigate()

  const handleArtistClick = (artistID) => {
    navigate(`/artist/${artistID}`)
  }

  return (
    <div className="artist-card">
      <img src={artist.image} alt={artist.name} className="artist-image" onClick={() => handleArtistClick(artist.id)}/>
      <h2 className="artist-title" >{artist.name}</h2>
      <FavoriteButton artist={artist} type="artist" />

      {artist.spotify && (
      <div className="spotify-link">
        <a href={artist.spotify} target="_blank" rel="noopener noreferrer">Listen on Spotify</a>
      </div>
    )}
    </div>
  )
}

ArtistInfo.propTypes = {
  artist: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    spotify: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
}

export default ArtistInfo

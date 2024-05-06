import PropTypes from 'prop-types'
import './ArtistInfo.css'

const ArtistInfo = ({ artist, onClick }) => {
  const spotifyLink = artist.sameAs.find(link => link.identifier === 'spotify')

  return (
    <div className="artist-card">
      <div className="artist-info">
        <img src={artist.image} alt={artist.name} className="artist-image" />
        <div className="artist-details">
          <h2 className="artist-title" onClick={() => onClick(artist.id)}>{artist.name}</h2>
          {artist.genre.length > 0 && (
            <p className="artist-genre">Genre: {artist.genre.join(', ')}</p>
          )}
          {spotifyLink && (
            <div className="spotify-link">
              <a href={spotifyLink.url} target="_blank" rel="noopener noreferrer">Listen on Spotify</a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

ArtistInfo.propTypes = {
  artist: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    genre: PropTypes.arrayOf(PropTypes.string).isRequired,
    sameAs: PropTypes.arrayOf(PropTypes.shape({
      identifier: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ArtistInfo

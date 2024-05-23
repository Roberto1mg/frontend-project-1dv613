import PropTypes from 'prop-types'
import ArtistInfo from '../ArtistInfo/ArtistInfo'

const ArtistList = ({ artists, heading, headingSize = 3, noArtistMessage }) => {
  const HeadingComponent = `h${headingSize}`

  return (
    <>
      <HeadingComponent className="center-text">{heading}</HeadingComponent>
      {artists.length > 0 ? (
        <div className="artist-container">
          {artists.map((artist) => (
            <ArtistInfo key={artist.id} item={artist} type={'artist'} />
          ))}
        </div>
      ) : (
        <p className="center-text">{noArtistMessage}</p>
      )}
    </>
  )
}

ArtistList.propTypes = {
  artists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  heading: PropTypes.string.isRequired,
  headingSize: PropTypes.number,
  noArtistMessage: PropTypes.string,
}

export default ArtistList

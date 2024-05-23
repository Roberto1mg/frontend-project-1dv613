import PropTypes from 'prop-types'
import ArtistInfo from '../ArtistInfo/ArtistInfo'

const EventList = ({ events, heading, headingSize, noEventMessage }) => {
  const HeadingComponent = `h${headingSize}`

  return (
    <>
      <HeadingComponent className="center-text">{heading}</HeadingComponent>
      {events.length > 0 ? (
        <div className="artist-container">
          {events.map((event) => (
            <ArtistInfo key={event.id} item={event} type={'event'} />
          ))}
        </div>
      ) : (
        <p className="center-text">{noEventMessage}</p>
      )}
    </>
  )
}

EventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  heading: PropTypes.string,
  headingSize: PropTypes.number,
  noEventMessage: PropTypes.string,
}

export default EventList

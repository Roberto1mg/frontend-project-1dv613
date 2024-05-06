import PropTypes from 'prop-types'
import './EventInfo.css'

const EventInfo = ({ event }) => {
  return (
    <div className="event-card">
      <div className="event-center">
        <h3 className="event-title">{event.name}</h3>
        <p className="event-date">Start date: {event.startDate}</p>
        <p className="event-date">End date: {event.endDate}</p>
        <p className="event-date">Location: {event.location}</p>
      </div>
    </div>
  )
}

EventInfo.propTypes = {
  event: PropTypes.shape({
    name: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
}

export default EventInfo

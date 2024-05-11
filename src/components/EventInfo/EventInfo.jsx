import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import './EventInfo.css'

const EventInfo = ({ event }) => {
  const navigate = useNavigate()

  const handleEventClick = (eventID) => {
    navigate(`/event/${eventID}`)
  }

  return (
    <div className="event-card" onClick={() => handleEventClick(event.id)} >
      <div className="event-info">
        <h2 className="event-title">{event.name}</h2>
        {event.image && (
        <img src={event.image} alt={event.name} className="event-image" />
        )}
        <p className="event-location">{event.location}</p>
        <div className="event-details">
          <p className="event-date">Starts: {event.startDate}</p>
          <p className="event-date">Ends: {event.endDate}</p>
        </div>
      </div>
    </div>
  )
}

EventInfo.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    image: PropTypes.string
  }).isRequired,
}

export default EventInfo

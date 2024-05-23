import './PaginationButton.css'
import PropTypes from 'prop-types'

const PaginationButton = ({ onPageChange, hasNextPage }) => {
  return (
    <div className="pagination">
      <button onClick={onPageChange} disabled={!hasNextPage}>Show More</button>
    </div>
  )
}

PaginationButton.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  hasNextPage: PropTypes.bool,
  loading: PropTypes.bool,
}

export default PaginationButton

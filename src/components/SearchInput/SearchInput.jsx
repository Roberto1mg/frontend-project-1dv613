import PropTypes from 'prop-types'
import './SearchInput.css'

const SearchInput = ({ value, onChange, onSubmit }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onSubmit(e)
    }
  }

  return (
    <input
      className="nav-text-input"
      type="text"
      placeholder="Search for artists or festivals here!"
      value={value}
      onChange={onChange}
      onKeyDown={handleKeyDown}
    />
  )
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default SearchInput

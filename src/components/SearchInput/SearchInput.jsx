import { useNavigate } from 'react-router-dom'
import './SearchInput.css'

const SearchInput = () => {
  const navigate = useNavigate()

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      navigate(`/artist/`, { state: { searchValue: e.target.value } })
      e.target.value=''
      e.target.blur()
    } else if (e.key === '/') {
      // Prevent '/' from being typed in the input.
      e.preventDefault()
    }
  }

  return (
    <input
      className="nav-text-input"
      type="text"
      placeholder="Search for artists or festivals here!"
      onKeyDown={handleKeyDown}
    />
  )
}

export default SearchInput

import './RegisterPage.css'

const ArtistPage = () => {
  const jwt = localStorage.getItem('jwt')

  const handleTEST = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:8080/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
      })

      // Log if the test failed or not (depending if user is logged in or not)
      const responseData = await response.json()
      console.log(responseData)

      if (!response.ok) {
        throw new Error('Failed to see profile')
      }

    } catch (error) {
      console.error('Error fetching data:', error)
    } 
  }

  return (
    <>
      <p>Artist</p>
      <form onSubmit={handleTEST}>
        <h2>Test if logged in? Check console for result!</h2>
        <button type='submit'>Test</button>
      </form>
    </>
  )
}

export default ArtistPage

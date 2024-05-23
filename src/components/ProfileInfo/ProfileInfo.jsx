import './ProfileInfo.css'

const ProfileInfo = () => {
  const username = localStorage.getItem('username')
  const firstName = localStorage.getItem('firstName')
  const lastName = localStorage.getItem('lastName')
  const email = localStorage.getItem('email')

  return (
    <div className="profile-container">
      <h2 className="center-text">Welcome to your profile, {username}!</h2>
      <div className="profile-info">
        <p><span className="label">First Name:</span> {firstName}</p>
        <p><span className="label">Last Name:</span> {lastName}</p>
        <p><span className="label">Username:</span> {username}</p>
        <p><span className="label">Email:</span> {email}</p>
      </div>
    </div>
  )
}

export default ProfileInfo

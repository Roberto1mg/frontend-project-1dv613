import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

const AboutPage = () => {
  return (
    <div className="about-page">
      <h2>About Us</h2>
      <p>
        Welcome to our platform! Our application is dedicated to helping you discover and connect with your favorite artists and festivals. Whether you&rsquo;re a music enthusiast looking to explore new artists or a festival-goer planning your next adventure, we have you covered.
      </p>
      <p>
        With our powerful search functionality, you can easily find information about artists and festivals. Simply enter the name of the artist or festival you&rsquo;re interested in, and we&rsquo;ll provide you with information and upcoming events.
      </p>
      <p>
        One of the key features of our platform is the ability to favorite artists and events. By creating an account, you can save your favorite artists and festivals, making it easy to keep track of the ones you love. This way, you&rsquo;ll never miss out on any updates or announcements from your favorite artists and events.
      </p>
      <p>
        We are passionate about music and festivals, and our goal is to create a community where fans can connect, share, and celebrate their love for music. Join us today and start exploring the world of music and festivals like never before!
      </p>

      <h3>Contact Us</h3>
      <div className="contact-info">
        <p><FontAwesomeIcon icon={faEnvelope} /> Email: rm222tx@student.lnu.se</p>
        <p><FontAwesomeIcon icon={faPhone} /> Phone: +4673-340 02 56</p>
        <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Address: Båstadsgatan 6C, Malmö, 214 39</p>
      </div>
    </div>
  )
}

export default AboutPage

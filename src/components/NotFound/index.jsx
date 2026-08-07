import './index.css'
import {useNavigate} from 'react-router'

const NotFound = () => {
  const navigate = useNavigate()
  const homePage = () => {
    navigate('/')
  }
  return (
    <section className="notfound-page">
      <img
        src="https://res.cloudinary.com/danbzhmg7/image/upload/v1785996964/notfound_ryvm8c.png"
        alt="page not found"
      />
      <h2>Page Not Found</h2>
      <p>
        we are sorry, the page you requested could not be found.
        <br />
        Please go back to the homepage.
      </p>
      <button onClick={homePage}>Home Page</button>
    </section>
  )
}

export default NotFound

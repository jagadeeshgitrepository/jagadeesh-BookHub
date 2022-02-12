import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <div className="no-found">
      <img
        src="https://res.cloudinary.com/dmpepn8dm/image/upload/v1644134466/miniproject-jagadeesh/Group_7484_kcujtx.png"
        alt="not found"
        className="not-found-image"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-paragraph">
        we are sorry, the page you requested could not be found.Please go back
        to the homepage.
      </p>
      <Link to="/" className="link">
        <button type="button" className="home-button">
          Go Back to Home
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound

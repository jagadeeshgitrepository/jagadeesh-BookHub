import './index.css'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const Social = () => (
  <div className="icons-container">
    <div className="icons">
      <FaGoogle />
      <FaTwitter />
      <FaInstagram />
      <FaYoutube />
    </div>
    <p className="contact-us">Contact us</p>
  </div>
)
export default Social

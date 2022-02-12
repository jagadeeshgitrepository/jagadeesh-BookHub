import './index.css'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import {BsFillBrightnessHighFill} from 'react-icons/bs'
import {AiOutlineMenu, AiFillCloseCircle} from 'react-icons/ai'
import {Component} from 'react'

class Header extends Component {
  state = {display: false, current: '/'}

  componentDidMount() {
    this.changeCurrentIconColor()
  }

  logout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  clickMenu = () => this.setState(prevState => ({display: !prevState.display}))

  changeCurrentIconColor = () => {
    const {history} = this.props
    console.log(history.location.pathname)
    this.setState({current: history.location.pathname})
  }

  render() {
    const {display, current} = this.state

    return (
      <>
        <nav className="navbar">
          <ul className="navbar-unordered-list">
            <Link to="/" className="link">
              <li>
                <img
                  src="https://res.cloudinary.com/dmpepn8dm/image/upload/v1643985975/miniproject-jagadeesh/Group_7731_4x_1_hyflux.png"
                  alt="website logo"
                  className="header-logo"
                />
              </li>
            </Link>

            <li>
              <AiOutlineMenu className="menu-icon" onClick={this.clickMenu} />
            </li>
            <li className="big-resolution">
              <div className="header-items">
                <Link to="/" className="link">
                  <p
                    className={`link-color ${
                      current === '/' ? 'blueColor' : null
                    }`}
                    onClick={this.changeCurrentIconColor}
                  >
                    Home
                  </p>
                </Link>
                <Link to="/shelf" className="link">
                  <p
                    className={`link-color ${
                      current === '/shelf' ? 'blueColor' : null
                    }`}
                    onClick={this.changeCurrentIconColor}
                  >
                    Bookshelves
                  </p>
                </Link>
                <button
                  type="button"
                  className="logout-button"
                  onClick={this.logout}
                >
                  Logout
                </button>
              </div>
            </li>
          </ul>
        </nav>
        {display ? (
          <ul className="display-horizontal">
            <li>
              <div className="slide">
                <Link to="/" className="link">
                  <p
                    className={`link-color ${
                      current === '/' ? 'blueColor' : null
                    }`}
                    onClick={this.changeCurrentIconColor}
                  >
                    Home
                  </p>
                </Link>
                <Link to="/shelf" className="link">
                  <p
                    className={` link-color ${
                      current === '/shelf' ? 'blueColor' : null
                    }`}
                    onClick={this.changeCurrentIconColor}
                  >
                    Bookshelves
                  </p>
                </Link>
                <button
                  type="button"
                  className="logout-button"
                  onClick={this.logout}
                >
                  Logout
                </button>
                <button
                  type="button"
                  className="close-button"
                  onClick={this.clickMenu}
                >
                  <AiFillCloseCircle className="closeIcon" />
                </button>
              </div>
            </li>
          </ul>
        ) : (
          ''
        )}
      </>
    )
  }
}

export default withRouter(Header)

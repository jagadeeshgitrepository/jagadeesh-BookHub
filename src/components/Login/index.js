import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showError: 'false',
    errorMsg: '',
  }

  submit = async event => {
    const {username, password} = this.state
    event.preventDefault()
    const data = {
      username,
      password,
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }
    const response = await fetch(apiUrl, options)
    const dataResponse = await response.json()
    if (response.ok === true) {
      const {history} = this.props
      const jwtToken = dataResponse.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 3})
      history.replace('/')
    } else {
      console.log(dataResponse.error_msg)
      this.setState({showError: 'true', errorMsg: dataResponse.error_msg})
    }
  }

  changeUsername = event => this.setState({username: event.target.value})

  changePassword = event => this.setState({password: event.target.value})

  render() {
    const {username, password, showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) return <Redirect to="/" />
    return (
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/dmpepn8dm/image/upload/v1643967778/miniproject-jagadeesh/Rectangle_1467_4x_zuyyzn.jpg"
          alt="website login"
          className="website-image"
        />
        <img
          src="https://res.cloudinary.com/dmpepn8dm/image/upload/v1643977497/miniproject-jagadeesh/Ellipse_99_qcagh5.png"
          alt="website login"
          className="website-image-minimize"
        />
        <div className="login-hold-container">
          <div className="login-main-container">
            <img
              src="https://res.cloudinary.com/dmpepn8dm/image/upload/v1643961273/miniproject-jagadeesh/Group_7731_4x_o1disk.png"
              alt="login website logo"
              className="logo"
            />

            <form className="form" onSubmit={this.submit}>
              <label htmlFor="username" className="label-name">
                Username*
              </label>
              <input
                type="text"
                id="username"
                className="input"
                onChange={this.changeUsername}
                value={username}
              />
              <label htmlFor="password" className="label-name">
                Password*
              </label>
              <input
                type="password"
                id="password"
                className="input"
                onChange={this.changePassword}
                value={password}
              />
              {showError ? <p className="error-paragraph">{errorMsg}</p> : null}
              <button type="submit" className="submit-button" id="buttonLogin">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Login

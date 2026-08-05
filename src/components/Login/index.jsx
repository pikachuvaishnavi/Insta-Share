import './index.css'
import {useState} from 'react'
import Cookie from 'js-cookie'
import {useNavigate, Navigate} from 'react-router'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [errormsg, setErrorMsg] = useState('')

  const navigate = useNavigate()
  const userInput = event => {
    setUsername(event.target.value)
  }
  const passInput = event => {
    setPassword(event.target.value)
  }

  const submitForm = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const userinfo = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userinfo),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      sucessSubmit(data.jwt_token)
    } else {
      failureSubmit(data.error_msg)
    }
    console.log(data)
  }
  const failureSubmit = error => {
    setError(true)
    setErrorMsg(error)
  }
  const sucessSubmit = token => {
    Cookie.set('jwt_token', token, {expires: 30})
    navigate('/', {replace: true})
  }

  const token = Cookie.get('jwt_token')
  if (token !== undefined) {
    return <Navigate to="/" replace />
  }

  return (
    <section className="main">
      <img
        alt="Login Image"
        className="login-img"
        src="https://res.cloudinary.com/danbzhmg7/image/upload/v1785896945/login-img_eoera2.png"
      />
      <div className="form">
        <div className="logo-form">
          <img
            src="https://res.cloudinary.com/danbzhmg7/image/upload/v1785905009/logo_gtr4id.png"
            alt="logo"
            className="logo"
          />
          <h3>Insta Share</h3>
        </div>
        <form onSubmit={submitForm}>
          <label htmlFor="username">USERNAME</label>
          <input
            id="username"
            placeholder="Enter username"
            type="text"
            onChange={userInput}
            value={username}
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            id="password"
            placeholder="Enter password"
            type="password"
            onChange={passInput}
            value={password}
          />
          {error && <p className="error">*{errormsg}</p>}
          <button className="login" type="submit">
            Login
          </button>
        </form>
      </div>
    </section>
  )
}
export default Login

import './index.css'

import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router'
import Cookie from 'js-cookie'
import {useNavigate} from 'react-router'

const Header = () => {
  const navigate = useNavigate()
  const logutApp = () => {
    Cookie.remove('jwt_token')
    navigate('/login', {replace: true})
  }
  return (
    <section className="header">
      <div className="header-logo">
        <img
          src="https://res.cloudinary.com/danbzhmg7/image/upload/v1785905009/logo_gtr4id.png"
          alt="logo"
          className="logo"
        />
        <p>Insta Share</p>
      </div>
      <div className="lists">
        <div className="search-icon">
          <input type="text" className="input" placeholder="Search Captions" />
          <button type="button" className="search" data-testid="searchIcon">
            <FaSearch />
          </button>
        </div>
        <Link to="/">
          <p>Home</p>
        </Link>
        <Link to="/myprofile">
          <p>Profile</p>
        </Link>
        <button className="logout" onClick={logutApp}>
          Logout
        </button>
      </div>
    </section>
  )
}
export default Header

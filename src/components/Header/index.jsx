import './index.css'

import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router'
import Cookie from 'js-cookie'
import {useNavigate} from 'react-router'
import {useState} from 'react'

const Header = () => {
  const [searchInput, setSearchInput] = useState('')

  const navigate = useNavigate()
  const logoutApp = () => {
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
          <input
            type="text"
            className="input"
            placeholder="Search Captions"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
          <button
            type="button"
            className="search"
            data-testid="searchIcon"
            onClick={() => onSearch(searchInput)}
          >
            <FaSearch />
          </button>
        </div>
        <Link to="/">Home</Link>
        <Link to="/myprofile">Profile</Link>
        <button className="logout" onClick={logoutApp}>
          Logout
        </button>
      </div>
    </section>
  )
}
export default Header

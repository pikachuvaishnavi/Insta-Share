import './index.css'

import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router'
import Cookie from 'js-cookie'
import {useNavigate} from 'react-router'
import {useState} from 'react'

const Header = props => {
  const {onSearchPosts} = props

  const [searchInput, setSearchInput] = useState('')

  const navigate = useNavigate()
  const logoutApp = () => {
    Cookie.remove('jwt_token')
    navigate('/login', {replace: true})
  }
  const onSearch = () => onSearchPosts(searchInput)
  return (
    <section className="header">
      <div className="header-logo">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/danbzhmg7/image/upload/v1785905009/logo_gtr4id.png"
            alt="website logo"
            className="logo"
          />
        </Link>
        <h3>Insta Share</h3>
      </div>
      <div className="lists">
        <div className="search-icon">
          <input
            type="search"
            className="input"
            placeholder="Search Caption"
            value={searchInput}
            onChange={event => setSearchInput(event.target.value)}
          />
          <button
            type="button"
            className="search"
            data-testid="searchIcon"
            onClick={onSearch}
          >
            <FaSearch />
          </button>
        </div>
        <Link to="/">Home</Link>
        <Link to="/my-profile">Profile</Link>
        <button className="logout" onClick={logoutApp}>
          Logout
        </button>
      </div>
    </section>
  )
}
export default Header

import './index.css'
import {Link} from 'react-router'

const UserStory = props => {
  const {stories} = props
  const {userName, userId, imgUrl} = stories
  return (
    <li className="stories">
      <Link to={`/users/${userId}`}>
        <img src={imgUrl} className="storyimg" alt="user story" />
      </Link>
      <p className="story-user-name">{userName}</p>
    </li>
  )
}
export default UserStory

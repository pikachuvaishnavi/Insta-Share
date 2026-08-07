import './index.css'

const UserStory = props => {
  const {stories} = props
  const {userName, imgUrl} = stories
  return (
    <div className="stories">
      <img src={imgUrl} className="storyimg" alt={userName} />
      <p className="story-user-name">{userName}</p>
    </div>
  )
}
export default UserStory

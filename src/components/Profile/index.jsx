import './index.css'
import {BsGrid3X3} from 'react-icons/bs'

const Profile = props => {
  const {details} = props
  const {
    name,
    userImg,
    followers,
    following,
    posts,
    posts_count,
    bio,
    stories,
    userId,
  } = details
  return (
    <section className="myprofile">
      <section className="profile-con">
        <img className="profile-img" src={userImg} />
        <div>
          <h1 className="profile-name">{name}</h1>
          <div className="counts">
            <p>
              <span className="profile-text-bold">{posts_count}</span> posts
            </p>
            <p>
              <span className="profile-text-bold">{followers}</span> followers
            </p>
            <p>
              <span className="profile-text-bold">{following}</span> following
            </p>
          </div>
          <p className="profile-text-bold">{userId}</p>
          <p>{bio}</p>
        </div>
      </section>
      <div className="stories-border">
        {stories.map(eachitem => (
          <img
            className="stories-img"
            src={eachitem.image}
            key={eachitem.id}
            alt="my story"
          />
        ))}
      </div>
      <hr />
      <section className="posts-con">
        <div className="posts-header">
          <BsGrid3X3 />
          <p>Posts</p>
        </div>
        <div className="posts-border">
          {posts.map(eachitem => (
            <img
              className="posts-img"
              src={eachitem.image}
              key={eachitem.id}
              alt="my posts"
            />
          ))}
        </div>
      </section>
    </section>
  )
}

export default Profile
// <Stories storydetails={eachitem} key={eachitem.id} />

import './index.css'
import PostActions from '../PostActions'

const Post = props => {
  const {details} = props
  const {
    id,
    userName,
    profilePic,
    postDetails,
    userId,
    createdAt,
    likesCount,
    comments,
  } = details

  return (
    <li className="posts-con">
      <div className="posts-user">
        <img
          className="posts-profile"
          src={profilePic}
          alt="post author profile"
        />
        <h4>{userName}</h4>
      </div>
      <img
        className="posts-details-img"
        alt="post"
        src={postDetails.image_url}
      />
      <div className="posts-text-con">
        <PostActions postId={id} likesCount={likesCount} />
        <p>{postDetails.caption}</p>
        {comments.map(item => (
          <p key={item.user_id}>
            <span className="bold-text-posts">{item.user_name}</span>
            {item.comment}
          </p>
        ))}
        <p className="light-text-posts">{createdAt}</p>
      </div>
    </li>
  )
}
export default Post

import './index.css'

import {BsHeart, BsFillShareFill} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {useState} from 'react'

const Post = props => {
  const [liked, setLiked] = useState(false)
  const {details} = props
  const {
    userName,
    profilePic,
    postDetails,
    userId,
    createdAt,
    likesCount,
    comments,
  } = details

  const likeHeart = () => {
    setLiked(prev => !prev)
  }

  return (
    <div className="posts-con">
      <div className="posts-user">
        <img
          className="posts-profile"
          src={profilePic}
          alt="post author profile"
        />
        <h4>{userName}</h4>
      </div>
      <img className="posts-img" src={postDetails.image_url} />
      <div className='posts-icons'>
        {liked ? (
          <button onClick={likeHeart} data-testid="heart" alt="likeIcon">
            <BsHeart />
          </button>
        ) : (
          <button onClick={likeHeart} data-testid="unlike" alt="unLikeIcon">
            <FcLike />
          </button>
        )}
        <FaRegComment />
        <BsFillShareFill />
      </div>
      <p className="bold-text-posts">{likesCount} likes</p>
      <p>{postDetails.caption}</p>
      {comments.map(item => (
        <p>
          <span className="bold-text-posts">{item.user_name}</span>{' '}
          {item.comment}
        </p>
      ))}
      <p className="light-text-posts">{createdAt}</p>
    </div>
  )
}
export default Post

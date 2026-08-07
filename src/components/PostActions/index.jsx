import {useState} from 'react'
import Cookies from 'js-cookie'
import './index.css'

import {BsHeart, BsFillShareFill} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'

const PostActions = props => {
  const {postId, likesCount} = props

  const [liked, setLiked] = useState(false)
  const [liked_count, setCount] = useState(likesCount)

  const token = Cookies.get('jwt_token')

  const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
  const data = {like_status: !liked}
  const options = {
    method: 'POST',
    headers: {Authorization: `Bearer ${token}`},
    body: JSON.stringify(data),
  }

  const postData = async () => {
    const response = await fetch(url, options)

    if (response.ok) {
      setLiked(!liked)
      if (!liked) {
        setCount(prev => prev + 1)
      } else {
        setCount(prev => prev - 1)
      }
    }
  }

  return (
    <div>
      <div className="posts-icons">
        {liked ? (
          <button
            className="heart-button"
            onClick={postData}
            data-testid="unLikeIcon"
          >
            <FcLike />
          </button>
        ) : (
          <button
            className="heart-button"
            data-testid="likeIcon"
            onClick={postData}
          >
            <BsHeart />
          </button>
        )}
        <FaRegComment />
        <BsFillShareFill />
      </div>
      <p className="bold-text-posts">{liked_count} likes</p>
    </div>
  )
}

export default PostActions

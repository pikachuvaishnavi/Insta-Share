import './index.css'
import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'

import Post from '../Post'

const PostList = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      const token = Cookies.get('jwt_token')

      const url = 'https://apis.ccbp.in/insta-share/posts'
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await fetch(url, options)

      const data = await response.json()
      console.log(data)

      if (response.ok) {
        const formatteddata = data.posts.map(eachPost => ({
          id: eachPost.post_id,
          userId: eachPost.user_id,
          userName: eachPost.user_name,
          profilePic: eachPost.profile_pic,
          postDetails: eachPost.post_details,
          likesCount: eachPost.likes_count,
          comments: eachPost.comments,
          createdAt: eachPost.created_at,
        }))

        setPosts(formatteddata)
        console.log(formatteddata)
      }
    }

    getPosts()
  }, [])

  return (
    <section>
      {posts.map(post => (
        <Post key={post.id} details={post} />
      ))}
    </section>
  )
}

export default PostList

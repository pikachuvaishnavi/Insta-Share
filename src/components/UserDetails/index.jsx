import './index.css'
import Header from '../Header'
import Profile from '../Profile'

import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {useParams} from 'react-router'

const UserDetails = () => {
  const [userdata, setUserDetails] = useState({
    stories: [],
    posts: [],
  })
  const {id} = useParams()
  useEffect(() => {
    const getData = async () => {
      const token = Cookies.get('jwt_token')

      console.log(token)
      const url = `https://apis.ccbp.in/insta-share/users/${id}`
      console.log(id)
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      }
      const response = await fetch(url, options)
      const data = await response.json()
      console.log(data)
      const fetched_data = {
        id: data.user_details.id,
        name: data.user_details.user_name,
        userImg: data.user_details.profile_pic,
        followers: data.user_details.followers_count,
        following: data.user_details.following_count,
        posts: data.user_details.posts,
        posts_count: data.user_details.posts_count,
        bio: data.user_details.user_bio,
        stories: data.user_details.stories,
        userId: data.user_details.user_id,
      }
      console.log(fetched_data.posts)
      if (response.ok) {
        setUserDetails(fetched_data)
      }
    }
    getData()
  }, [])

  const alttext = {
    imgalt: 'user profile',
    storyalt: 'user story',
    postalt: 'user post',
  }

  return (
    <section>
      <Header />
      <Profile details={userdata} alt={alttext} />
    </section>
  )
}

export default UserDetails

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
        id: data.profile.id,
        name: data.profile.user_name,
        userImg: data.profile.profile_pic,
        followers: data.profile.followers_count,
        following: data.profile.following_count,
        posts: data.profile.posts,
        posts_count: data.profile.posts_count,
        bio: data.profile.user_bio,
        stories: data.profile.stories,
        userId: data.profile.user_id,
      }
      console.log(fetched_data.posts)
      if (response.ok) {
        setUserDetails(fetched_data)
      }
    }
    getData()
  }, [])

  return (
    <section>
      <Header />
      <Profile details={userdata} />
    </section>
  )
}

export default UserDetails

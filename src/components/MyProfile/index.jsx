import './index.css'
import Header from '../Header'
import Profile from '../Profile'

import Cookie from 'js-cookie'

import {useEffect, useState} from 'react'

const MyProfile = () => {
  const [userdata, setUserDetails] = useState({
    stories: [],
    posts: [],
  })

  useEffect(() => {
    const getData = async () => {
      const token = Cookie.get('jwt_token')
      console.log(token)
      const url = 'https://apis.ccbp.in/insta-share/my-profile'
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

  const alttext = {
    imgalt: 'my profile',
    storyalt: 'my story',
    postalt: 'my post',
  }

  return (
    <article>
      <Header />

      <Profile details={userdata} key={userdata.id} alt={alttext} />
    </article>
  )
}

export default MyProfile

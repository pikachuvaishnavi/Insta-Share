import './index.css'
import Header from '../Header'
import Profile from '../Profile'
import apiStatusConstants from '../../constants/APIConstants.js'
import FailureView from '../FailureView'
import SomethingWentWrong from '../SomethingWentWrong'

import ClipLoader from 'react-spinners/ClipLoader'
import Cookie from 'js-cookie'

import {useEffect, useState} from 'react'

const MyProfile = () => {
  const [userdata, setUserDetails] = useState({
    stories: [],
    posts: [],
  })
  const [apistatus, setapiStatus] = useState(apiStatusConstants.initial)

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
      setapiStatus(apiStatusConstants.success)
    } else {
      setapiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    setapiStatus(apiStatusConstants.inProgress)
    getData()
  }, [])

  const alttext = {
    imgalt: 'my profile',
    storyalt: 'my story',
    postalt: 'my post',
  }

  const onRetry = () => {
    getData()
  }

  const renderLoading = () => (
    <section>
      <div className="loader-container" data-testid="loader">
        <ClipLoader color="skyblue" size={30} />
      </div>
    </section>
  )
  const renderOnSucess = () => (
    <article>
      <Header />
      <Profile details={userdata} key={userdata.id} alt={alttext} />
    </article>
  )
  const renderOnFailure = () => (
    <article>
      <FailureView onRetry={onRetry} />
    </article>
  )

  const renderSomethingWrong = () => (
    <article>
      <SomethingWentWrong onRetry={onRetry} />
    </article>
  )

  const renderContent = () => {
    switch (apistatus) {
      case apiStatusConstants.inProgress:
        return renderLoading()
      case apiStatusConstants.success:
        return renderOnSucess()
      case apiStatusConstants.failure:
        return renderOnFailure()
      default:
        return renderSomethingWrong()
    }
  }

  return <>{renderContent()}</>
}

export default MyProfile

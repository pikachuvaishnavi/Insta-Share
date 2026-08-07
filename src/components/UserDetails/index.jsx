import './index.css'
import Header from '../Header'
import Profile from '../Profile'
import apiStatusConstants from '../../constants/APIConstants.js'
import FailureView from '../FailureView'
import SomethingWentWrong from '../SomethingWentWrong'

import ClipLoader from 'react-spinners/ClipLoader'

import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {useParams} from 'react-router'

const UserDetails = () => {
  const [userdata, setUserDetails] = useState({
    stories: [],
    posts: [],
  })
  const [apistatus, setapiStatus] = useState(apiStatusConstants.initial)

  const {id} = useParams()

  const getData = async () => {
    const token = Cookies.get('jwt_token')

    // console.log(token)
    const url = `https://apis.ccbp.in/insta-share/users/${id}`
    // console.log(id)
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
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
    // console.log(fetched_data.posts)
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
    imgalt: 'user profile',
    storyalt: 'user story',
    postalt: 'user post',
  }

  const onRetry = () => {
    getData()
  }

  const renderLoading = () => (
    <section>
      <div className="loader-container" data-testid="loader">
        <ClipLoader color="gold" size={15} />
      </div>
    </section>
  )
  const renderOnSucess = () => (
    <section>
      <Header />
      <Profile details={userdata} alt={alttext} />
    </section>
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

export default UserDetails

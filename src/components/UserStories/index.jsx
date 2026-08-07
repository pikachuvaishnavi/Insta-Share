import UserStory from '../UserStory'
import './index.css'
import {reactSlickSettings} from '../../constants/UIConstants.js'
import apiStatusConstants from '../../constants/APIConstants.js'
import FailureView from '../FailureView'
import SomethingWentWrong from '../SomethingWentWrong'

import ClipLoader from 'react-spinners/ClipLoader'

import Cookies from 'js-cookie'
import {useState, useEffect} from 'react'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const UserStories = () => {
  const [storydata, setStoryDetails] = useState([])
  const [apistatus, setapiStatus] = useState(apiStatusConstants.initial)

  const getData = async () => {
    const token = Cookies.get('jwt_token')
    // console.log(token)
    const url = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    const fetched_data = data.users_stories.map(eachItem => ({
      imgUrl: eachItem.story_url,
      userId: eachItem.user_id,
      userName: eachItem.user_name,
    }))
    // console.log(fetched_data)
    if (response.ok) {
      setStoryDetails(fetched_data)
      setapiStatus(apiStatusConstants.success)
    } else {
      setapiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    setapiStatus(apiStatusConstants.inProgress)
    getData()
  }, [])

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
      <ul className="stories-list">
        <Slider {...reactSlickSettings}>
          {storydata.map(eachitem => {
            return <UserStory stories={eachitem} key={eachitem.userId} />
          })}
        </Slider>
      </ul>
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

export default UserStories

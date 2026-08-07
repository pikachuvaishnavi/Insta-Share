import UserStory from '../UserStory'
import './index.css'

import Cookies from 'js-cookie'
import {useState, useEffect} from 'react'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const UserStories = () => {
  const [storydata, setStoryDetails] = useState([])

  useEffect(() => {
    const getData = async () => {
      const token = Cookies.get('jwt_token')
      console.log(token)
      const url = 'https://apis.ccbp.in/insta-share/stories'
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      }
      const response = await fetch(url, options)
      const data = await response.json()
      console.log(data)
      const fetched_data = data.users_stories.map(eachItem => ({
        imgUrl: eachItem.story_url,
        userId: eachItem.user_id,
        userName: eachItem.user_name,
      }))
      console.log(fetched_data)
      if (response.ok) {
        setStoryDetails(fetched_data)
      }
    }
    getData()
  }, [])
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: true,
  }
  return (
    <section className="stories-list">
      <Slider {...settings}>
        {storydata.map(eachitem => {
          return <UserStory stories={eachitem} key={eachitem.userId} />
        })}
      </Slider>
    </section>
  )
}

export default UserStories

import './index.css'
import Header from '../Header'
import Cookie from 'js-cookie'

import {useEffect} from 'react'

const MyProfile = () => {
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
    }
    getData()
  })

  return (
    <article>
      <Header />
      <section>
        <h1>Profile</h1>
      </section>
    </article>
  )
}

export default MyProfile

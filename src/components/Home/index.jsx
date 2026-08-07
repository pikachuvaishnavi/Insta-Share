// Write your code here
import './index.css'
import Header from '../Header'
import UserStories from '../UserStories'
import PostList from '../PostList'

import {useState} from 'react'

const Home = () => {
  const [searchInput, setSearchInput] = useState('')

  const onSearchPosts = value => {
    setSearchInput(value)
  }
  return (
    <section className="home-section">
      <Header onSearchPosts={onSearchPosts} />
      <UserStories />
      <PostList searchInput={searchInput} />
    </section>
  )
}
export default Home
// //<Slider {...settings}>
//   {stories.map(eachStory => (
//     <Story key={eachStory.id} story={eachStory} />
//   ))}
// </Slider>

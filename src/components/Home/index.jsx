// Write your code here
import './index.css'
import Header from '../Header'
import UserStories from '../UserStories'
import PostList from '../PostList'

const Home = () => {
  return (
    <div>
      <Header />
      <UserStories />
      <PostList />
    </div>
  )
}
export default Home
// //<Slider {...settings}>
//   {stories.map(eachStory => (
//     <Story key={eachStory.id} story={eachStory} />
//   ))}
// </Slider>

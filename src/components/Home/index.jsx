// Write your code here
import './index.css'
import Header from '../Header'
import UserStories from '../UserStories'
import PostList from '../PostList'

const Home = () => {
  return (
    <section className="home-section">
      <Header />
      <UserStories />
      <PostList />
    </section>
  )
}
export default Home
// //<Slider {...settings}>
//   {stories.map(eachStory => (
//     <Story key={eachStory.id} story={eachStory} />
//   ))}
// </Slider>

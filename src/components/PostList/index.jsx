import './index.css'
import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import apiStatusConstants from '../../constants/APIConstants.js'
import FailureView from '../FailureView'
import SearchNotFound from '../SearchNotFound'
import Post from '../Post'
import SomethingWentWrong from '../SomethingWentWrong'

import ClipLoader from 'react-spinners/ClipLoader'

const PostList = props => {
  const {searchInput} = props

  const [apistatus, setapiStatus] = useState(apiStatusConstants.initial)
  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    const token = Cookies.get('jwt_token')
    const url =
      searchInput === ''
        ? 'https://apis.ccbp.in/insta-share/posts'
        : `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok) {
      const formatteddata = data.posts.map(eachPost => ({
        id: eachPost.post_id,
        userId: eachPost.user_id,
        userName: eachPost.user_name,
        profilePic: eachPost.profile_pic,
        postDetails: eachPost.post_details,
        likesCount: eachPost.likes_count,
        comments: eachPost.comments,
        createdAt: eachPost.created_at,
      }))
      setPosts(formatteddata)
      // console.log(formatteddata)
      // console.log(formatteddata.comments)
      setapiStatus(apiStatusConstants.success)
    } else {
      setapiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    setapiStatus(apiStatusConstants.inProgress)
    getPosts()
  }, [searchInput])

  const onRetry = () => {
    getPosts()
  }
  const renderOnSearchResult = () => (
    <section className="posts-section ">
      <h3>Search Results</h3>
      <ul className="posts-search-section">
        {posts.map(post => (
          <Post key={post.id} details={post} />
        ))}
      </ul>
    </section>
  )

  const renderDefaultPosts = () => (
    <section className="posts-section">
      {posts.map(post => (
        <Post key={post.id} details={post} />
      ))}
    </section>
  )

  const renderLoading = () => (
    <section>
      <div className="loader-container" data-testid="loader">
        <ClipLoader color="gold" size={15} />
      </div>
    </section>
  )
  const renderSearchNotFoundView = () => (
    <section>
      <SearchNotFound />
    </section>
  )
  const renderOnSucess = () => (
    <>{searchInput === '' ? renderDefaultPosts() : renderOnSearchResult()}</>
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
        return posts.length === 0
          ? renderSearchNotFoundView()
          : renderOnSucess()
      case apiStatusConstants.failure:
        return renderOnFailure()
      default:
        return renderSomethingWrong()
    }
  }

  return <>{renderContent()}</>
}

export default PostList

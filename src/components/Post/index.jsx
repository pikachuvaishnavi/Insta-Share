const Post = props => {
  const {details} = props
  const {
    userName,
    profilePic,
    postDetails,
    userId,
    createdAt,
    likesCount,
    comments,
  } = details

  return (
    <div>
      <div>
        <img src={profilePic} />
        <h4>{userName}</h4>
      </div>
      <img src={postDetails.image_url} />
      <div>//icons</div>
      <p>{likesCount} likes</p>
      <p>{postDetails.caption}</p>
      {comments.map(item => (
        <p>
          <span>{item.user_name}</span> {item.comment}
        </p>
      ))}
    </div>
  )
}
export default Post

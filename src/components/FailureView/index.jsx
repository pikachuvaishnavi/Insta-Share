import './index.css'

const FailureView = ({onRetry}) => {
  return (
    <section className="failure-page">
      <img
        src="https://res.cloudinary.com/danbzhmg7/image/upload/v1785998924/failureIcon_touqxb.png"
        alt="failure view"
      />
      <h3>Something went wrong. Please try again</h3>
      <button onClick={onRetry}>Try again</button>
    </section>
  )
}
export default FailureView

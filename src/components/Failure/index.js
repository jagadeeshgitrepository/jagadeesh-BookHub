import './index.css'

const Failure = props => {
  const {retryApi} = props
  const retry = () => retryApi()

  return (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dmpepn8dm/image/upload/v1644137462/miniproject-jagadeesh/Group_7522_xyehys.png"
        alt="failure view"
        className="no-books-img"
      />
      <p className="failure-heading">Something went wrong. Please try again</p>

      <button type="button" className="try-again" onClick={retry}>
        Try Again
      </button>
    </div>
  )
}
export default Failure

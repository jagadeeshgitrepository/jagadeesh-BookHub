import './index.css'

const Empty = props => {
  const {msg} = props
  return (
    <div className="search-failure-container">
      <img
        src="https://res.cloudinary.com/dmpepn8dm/image/upload/v1644135051/miniproject-jagadeesh/Asset_1_1_dithja.png"
        alt="no books"
        className="search-failure-image"
      />
      <p className="search-failure-paragraph">
        Your search for {msg} did not find any matches.
      </p>
    </div>
  )
}
export default Empty

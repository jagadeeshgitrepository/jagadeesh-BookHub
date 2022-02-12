import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch, BsFillStarFill} from 'react-icons/bs'
import Header from '../Header/index'
import Social from '../Social/index'
import Failure from '../Failure/index'
import SideBar from '../SideBar/index'
import Empty from '../Empty/index'

const detailsStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  empty: 'EMPTY',
}

class BookShelves extends Component {
  state = {
    searchInput: '',

    shelf: 'ALL',
    bookHeading: 'ALL',
    status: detailsStatus.loading,
  }

  componentDidMount() {
    this.getDetails()
  }

  selectedShelf = (shelf, bookHeading) =>
    this.setState({shelf, bookHeading}, this.getDetails)

  getDetails = async () => {
    this.setState({status: detailsStatus.loading})

    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, shelf} = this.state
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${shelf}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    console.log(data.total)
    if (response.ok === true) {
      if (data.total !== undefined) {
        const newList = data.books.map(eachItem => ({
          id: eachItem.id,
          authorName: eachItem.author_name,
          coverPic: eachItem.cover_pic,
          title: eachItem.title,

          readStatus: eachItem.read_status,
          rating: eachItem.rating,
        }))

        console.log(newList)
        this.setState({topList: newList, status: detailsStatus.success})
      } else this.setState({topList: '', status: detailsStatus.empty})
    } else {
      this.setState({topList: '', status: detailsStatus.failure})
    }
  }

  retryApi = () => this.getDetails()

  switchDetails = () => {
    const {status, searchInput} = this.state
    switch (status) {
      case detailsStatus.loading:
        return this.loading()
      case detailsStatus.success:
        return this.success()
      case detailsStatus.failure:
        return <Failure retryApi={this.retryApi} />
      case detailsStatus.empty:
        return <Empty msg={searchInput} />

      default:
        return null
    }
  }

  loading = () => (
    <div testid="loader" className="loader">
      <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
    </div>
  )

  getBooks = eachItem => {
    const {id, authorName, coverPic, title, rating, readStatus} = eachItem

    return (
      <div className="book-item">
        <div>
          <img src={coverPic} alt={title} className="book-image" />
        </div>
        <div className="image-details">
          <h1 className="title-image">{title}</h1>
          <p className="author-name">{authorName}</p>
          <div className="rating-container">
            <p className="avg-rating">Avg Rating</p>
            <BsFillStarFill className="star" />
            <p className="rating-paragraph">{rating}</p>
          </div>
          <div>
            <p className="status-paragraph">
              Status: <span className="read-status">{readStatus}</span>
            </p>
          </div>
        </div>
      </div>
    )
  }

  success = () => {
    const {topList} = this.state

    return (
      <>
        <ul className="books-list-container">
          {topList.map(eachItem => (
            <Link
              to={`/books/${eachItem.id}`}
              className="link"
              key={eachItem.id}
            >
              <li key={eachItem.id}>{this.getBooks(eachItem)}</li>
            </Link>
          ))}
        </ul>
        <Social />
      </>
    )
  }

  changeSearch = event => this.setState({searchInput: event.target.value})

  render() {
    const {bookHeading, searchInput} = this.state
    return (
      <>
        <Header />

        <div className="bookshelves-container">
          <SideBar selectedShelf={this.selectedShelf} />
          <div className="top-read-container">
            <h1 className="selected-books-heading">{bookHeading} Books</h1>
            <div className="search-container">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                value={searchInput}
                onChange={this.changeSearch}
              />
              <div className="search-icon-container">
                <button
                  type="button"
                  testid="searchButton"
                  className="search-button"
                  onClick={this.getDetails}
                >
                  <BsSearch />
                </button>
              </div>
            </div>
          </div>
          <div className="bookshelves-right-container">
            {this.switchDetails()}
          </div>
        </div>
      </>
    )
  }
}
export default BookShelves

import './index.css'
import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import Header from '../Header/index'
import Empty from '../Empty/index'
import Social from '../Social/index'
import Failure from '../Failure/index'

const detailsStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  empty: 'EMPTY',
}

class BookDetails extends Component {
  state = {
    bookList: '',

    status: detailsStatus.loading,
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({status: detailsStatus.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, shelf} = this.state
    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      if (data.total !== 0) {
        const eachItem = data.book_details
        const newList = {
          id: eachItem.id,
          authorName: eachItem.author_name,
          coverPic: eachItem.cover_pic,
          title: eachItem.title,
          aboutAuthor: eachItem.about_author,
          aboutBook: eachItem.about_book,
          readStatus: eachItem.read_status,
          rating: eachItem.rating,
        }

        console.log(newList)
        this.setState({topList: newList, status: detailsStatus.success})
      } else if (data.total === 0)
        this.setState({topList: '', status: detailsStatus.empty})
    } else {
      this.setState({topList: '', status: detailsStatus.failure})
    }
  }

  switchDetails = () => {
    const {status, searchInput} = this.state
    switch (status) {
      case detailsStatus.loading:
        return this.loading()
      case detailsStatus.success:
        return this.success()
      case detailsStatus.failure:
        return <Failure retryApi={this.retryApi} status="failure view" />
      case detailsStatus.empty:
        return <Empty msg={searchInput} />
      default:
        return null
    }
  }

  retryApi = () => this.getDetails()

  loading = light => (
    <div testid="loader" className="loader">
      <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
    </div>
  )

  success = () => {
    const {topList} = this.state
    const {
      id,
      authorName,
      coverPic,
      title,
      rating,
      readStatus,
      aboutAuthor,
      aboutBook,
    } = topList
    console.log(topList)
    return (
      <>
        <div className="book-details-container">
          <div className="book-details">
            <div className="book-container">
              <div>
                <img src={coverPic} alt={title} className="detail-img" />
              </div>
              <div>
                <h1 className="book-details-heading">{title}</h1>
                <p className="author-name">{authorName}</p>
                <div className="book-detail-rating">
                  <p className="rating-heading">Avg Rating</p>
                  <BsFillStarFill className="star" />
                  <p className="rating">{rating}</p>
                </div>
                <div className="status-container">
                  <p className="status-paragraph">Status: </p>
                  <p className="read-status">{readStatus}</p>
                </div>
              </div>
            </div>
            <hr className="line" />
            <h1 className="book-details-heading">About Author</h1>
            <p>{aboutAuthor}</p>
            <h1 className="book-details-heading">About Book</h1>
            <p>{aboutBook}</p>
          </div>
        </div>
        <Social />
      </>
    )
  }

  changeSearch = event => this.setState({searchInput: event.target.value})

  render() {
    const {status} = this.state
    return (
      <>
        <Header />
        {this.switchDetails()}
      </>
    )
  }
}
export default BookDetails

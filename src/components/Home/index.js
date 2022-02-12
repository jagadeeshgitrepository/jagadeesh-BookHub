import './index.css'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {Component} from 'react'

import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Header from '../Header/index'
import Failure from '../Failure/index'
import Empty from '../Empty/index'
import Social from '../Social/index'

const detailsStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class Home extends Component {
  state = {
    topList: '',
    status: detailsStatus.loading,
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({status: detailsStatus.loading})
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
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
        const newList = data.books.map(eachItem => ({
          id: eachItem.id,
          authorName: eachItem.author_name,
          coverPic: eachItem.cover_pic,
          title: eachItem.title,
        }))

        console.log(newList)
        this.setState({topList: newList, status: detailsStatus.success})
      } else this.setState({list: '', status: detailsStatus.empty})
    } else {
      this.setState({list: '', status: detailsStatus.failure})
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

  loading = () => (
    <div testid="loader" className="loader">
      <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
    </div>
  )

  success = () => {
    const {topList} = this.state
    console.log(topList[0].author)

    return (
      <ul>
        <Slider {...settings} className="slick-container">
          {topList.map(eachItem => (
            <Link
              to={`/books/${eachItem.id}`}
              className="link"
              key={eachItem.id}
            >
              <li className="slick-item" key={eachItem.id}>
                <div className="top-rated-images-container">
                  <img
                    src={eachItem.coverPic}
                    alt={eachItem.title}
                    className="topRatedImages"
                  />
                </div>
                <h1 className="title">{eachItem.title}</h1>
                <p className="author">{eachItem.authorName}</p>
              </li>
            </Link>
          ))}
        </Slider>
      </ul>
    )
  }

  render() {
    return (
      <>
        <Header className="bottom" />
        <div className="home-container">
          <h1 className="home-heading">Find Your Next Favorite Books?</h1>
          <p className="home-paragraph">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <div className="slick-main-container">
            <div className="findBooksContainer">
              <h1 className="heading">Top Rated Books</h1>
              <Link to="/shelf">
                <button type="button" className="findBooks">
                  Find Books
                </button>
              </Link>
            </div>
            {this.switchDetails()}
          </div>
          <Social />
        </div>
      </>
    )
  }
}
export default Home

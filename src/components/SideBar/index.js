import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class SideBar extends Component {
  state = {selectedShelf: 'ALL'}

  changeShelf = event => {
    console.log(event.target.id)
    const {selectedShelf} = this.props

    this.setState(
      {selectedShelf: event.target.id},
      selectedShelf(event.target.id, event.target.textContent),
    )
  }

  render() {
    const {selectedShelf} = this.state

    console.log(selectedShelf)
    return (
      <div className="sidebar-container">
        <h1 className="bookshelves-heading">Bookshelves</h1>
        <ul className="sidebar-list">
          {bookshelvesList.map(eachItem => (
            <li key={eachItem.id}>
              <button
                id={eachItem.value}
                type="button"
                onClick={this.changeShelf}
                className={` sidebar-button sidebar-item ${
                  eachItem.value === selectedShelf ? 'blue' : null
                }`}
              >
                {eachItem.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
export default SideBar

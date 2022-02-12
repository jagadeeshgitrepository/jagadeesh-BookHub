import './App.css'
import {Switch, Route} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Home from './components/Home/index'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login/index'
import BookShelves from './components/BookShelves/index'
import BookDetails from './components/Book Details/index'
import NotFound from './components/NotFound/index'

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

// Replace your code here
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/shelf" component={BookShelves} />
        <ProtectedRoute exact path="/books/:id" component={BookDetails} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}

export default App

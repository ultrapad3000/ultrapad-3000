import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Login from './components/pages/login'
import Register from './components/pages/register'
import logo from './logo.svg'

const constructor = () => (
  <Router>
    <div className="App">
      <header className="App-header">
        <img className="App-logo" src={ logo } alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <ul>
        <li>
          <Link to="/login" href="/login">Login</Link>
        </li>
        <li>
          <Link to="/register" href="/register">Register</Link>
        </li>
      </ul>
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
    </div>
  </Router>
)

export default constructor

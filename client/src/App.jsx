import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom' // Link
import Login from './components/pages/login'
import Register from './components/pages/register'

const App = () => (
  <Router>
    <div className="App">
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
    </div>
  </Router>
)

export default App

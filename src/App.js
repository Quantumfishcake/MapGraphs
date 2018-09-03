import React, { Component } from 'react'
import './App.css'
import Map from './components/Map.js'

class App extends Component {
  constructor () {
    super()
    this.state = {
      country: ''
    }
  }

  render () {
    return (
      <div className='App'>
        <Map width={1500} height={700} />
      </div>
    )
  }
}

export default App

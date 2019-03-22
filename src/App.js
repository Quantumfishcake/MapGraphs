import React, { Component } from 'react'
import './App.css'
import ZoomPan from './components/zoommap.js'

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
         <ZoomPan />
      </div>
    )
  }
}

export default App

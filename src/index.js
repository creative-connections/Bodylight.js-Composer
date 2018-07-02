import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import 'normalize-scss'
import './scss/base.scss'

class App extends Component {
  render () {
    return (
      <div className="layout">
        <header>
        </header>
        <div className="middle">
          <div className='left'>
          </div>
          <div className='grapes'>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))

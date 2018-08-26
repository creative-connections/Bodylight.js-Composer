import React, { Component } from 'react'

import Builder from '@runtime'

class Preview extends Component {
  constructor (props) {
    super(props)

    const builder = new Builder()
    this.src = builder.build()
  }

  render () {
    return <div className='leftShadow'>
      <iframe srcDoc={this.src} className="preview"></iframe>
    </div>
  }
}

export default Preview

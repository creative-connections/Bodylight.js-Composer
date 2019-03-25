import React, { Component, Fragment } from 'react'

import Builder from '@runtime'
import BusySignal from '@components/BusySignal'

class Preview extends Component {
  constructor (props) {
    super(props)
    this.src = null
  }

  componentDidMount () {
    window.setTimeout(() => {
      new Promise(resolve => {
        const builder = new Builder()
        builder.setMinify(false)
        builder.setExportPerformanceBlock(true)
        builder.build().then(html => {
          this.src = html
          resolve()
        }).catch(error => {
          // TODO: handle me
          console.error(error)
        })
      }).then(() => {
        this.forceUpdate()
      })
    }, 10)
  }

  render () {
    const busy = this.src === null
    return <Fragment>
      <BusySignal busy={busy} description='Exporting code...'/>
      <div className='leftShadow'>
        {this.src && <iframe srcDoc={this.src} className="preview"></iframe> }
      </div>
    </Fragment>
  }
}

export default Preview

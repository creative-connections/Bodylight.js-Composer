import React, { Component } from 'react'

import Runtime from '@helpers/Animate/Runtime'

import { ResizableBox } from 'react-resizable'

class AnimatePlayer extends Component {
  constructor (props) {
    super(props)
    this.handleResize = this.handleResize.bind(this)

    this.canvas = React.createRef()
    this.runtime = new Runtime(this.props.source, this.props.name)
  }

  componentDidMount () {
    createjs.Ticker.setFPS(60)
    this.runtime.init(this.canvas.current, 'beaker', true).then(() => {
    })
  }

  componentWillUnmount () {
    this.runtime.destroy()
  }

  handleResize (evt, data) {
    this.runtime.resize(data.size.width, data.size.height)
  }

  render () {
    const width = this.props.width
    const height = this.props.height

    return <ResizableBox width={width} height={height} onResize={this.handleResize}>
      <canvas ref={this.canvas} width={width} height={height} />
    </ResizableBox>
  }
}

export default AnimatePlayer

import React, { Component } from 'react'

import Runtime from '@helpers/Animate/Runtime'

import { ResizableBox } from 'react-resizable'

class AnimatePlayer extends Component {
  constructor (props) {
    super(props)
    this.handleResize = this.handleResize.bind(this)
    this.canvas = React.createRef()
    this.runtime = null
    this.createRuntime(this.props.source, this.props.name)
  }

  isRuntime () {
    return this.runtime !== null
  }

  createRuntime (source, name) {
    if (source !== null && name !== null) {
      this.runtime = new Runtime(source, name)
    }
  }

  initRuntime () {
    if (this.isRuntime()) {
      if (this.canvas.current !== null) {
        this.runtime.init(this.canvas.current, true).then()
      }
    }
  }

  destroyRuntime () {
    if (this.isRuntime()) {
      this.runtime.destroy()
      this.runtime = null
    }
  }

  componentDidMount () {
    this.initRuntime()
  }

  componentWillUnmount () {
    this.destroyRuntime()
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.source !== this.props.source || nextProps.name !== this.props.name) {
      this.destroyRuntime()
      this.createRuntime(nextProps.source, nextProps.name)
      return true
    }
    return false
  }

  componentDidUpdate () {
    this.initRuntime()
  }

  handleResize (evt, data) {
    if (this.isRuntime()) {
      this.runtime.resize(data.size.width, data.size.height)
    }
  }

  render () {
    if (!this.isRuntime()) {
      return null
    }
    const width = this.props.width
    const height = this.props.height

    return <ResizableBox width={width} height={height} onResize={this.handleResize}>
      <canvas ref={this.canvas} width={width} height={height} />
    </ResizableBox>
  }
}

export default AnimatePlayer

import React, { Component, Fragment } from 'react'
import { SketchPicker } from 'react-color'
import { Button } from 'semantic-ui-react'

class ColorPicker extends Component {
  constructor (props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.state = { opened: false }
  }

  handleOnChange (color) {
    const c = color.rgb
    const value = `rgba(${c.r},${c.g},${c.b},${c.a})`
    this.props.onChange(null, {
      name: this.props.name,
      value: value
    })
  }

  renderPicker () {
    if (!this.state.opened) {
      return null
    }
    return <Fragment> <br/><br/>
      <SketchPicker className='inline-block'
        color={this.props.value}
        onChange={this.handleOnChange} />
    </Fragment>
  }

  handleButtonClick () {
    this.setState({ opened: !this.state.opened })
  }

  render () {
    return <Fragment>
      <div className="colorpicker">
        <Button onClick={this.handleButtonClick} style={{display: 'inline-block'}}>
          <div className="color-box" style={{backgroundColor: this.props.value}} />
          {this.props.value}
        </Button>
        { this.renderPicker() }
      </div>

    </Fragment>
  }
}

export default ColorPicker

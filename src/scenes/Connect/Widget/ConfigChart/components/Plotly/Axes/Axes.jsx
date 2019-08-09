import React, { Component, Fragment } from 'react'
import Collapsable from '@components/Collapsable'
import Axis from './Axis'

class Axes extends Component {
  constructor(props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange(e, { name, value }) {
    this.props.onChange(this.props.chart, { name, value } )
  }

  renderAxis(name, axis) {
    return <Fragment key={`${this.props.chart}-collapsable-${name}`}>
      <Collapsable  title={name} className='secondary' collapsed={true}>
        <Axis config={axis} name={`${this.props.name}.${name}`} onChange={this.handleOnChange} />
      </Collapsable>
    </Fragment>
  }

  render() {
    const config = this.props.config
    const axes = []
    Object.entries(config).forEach(([name, axis]) => {
      axes.push(this.renderAxis(name, axis))
    })
    return axes
  }
}

export default Axes

import React, { Component } from 'react'
import { Grid, Form, Label } from 'semantic-ui-react'
import InputFloat from '@components/form/InputFloat'

import update from 'immutability-helper'

const calculateTps = (stepSize, interval) => {
  return 1000 / interval
}

const calculateFactor = (stepSize, interval) => {
  return (1000 / interval) * stepSize
}

class ContinuousMode extends Component {
  constructor (props) {
    super(props)

    const options = props.options

    this.state = {
      'factor': calculateFactor(options.stepSize, options.interval),
      'tps': calculateTps(options.stepSize, options.interval)
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleFactorChange = this.handleFactorChange.bind(this)
    this.fillTps = this.fillTps.bind(this)
    this.fillFactor = this.fillFactor.bind(this)
  }

  fillTps (name, value) {
    if (name === 'stepSize') {
      return calculateTps(value, this.props.options.interval)
    } else {
      return calculateTps(this.props.options.stepSize, value)
    }
  }

  fillFactor (name, value) {
    if (name === 'stepSize') {
      return calculateFactor(value, this.props.options.interval)
    } else {
      return calculateFactor(this.props.options.stepSize, value)
    }
  }

  handleChange (e, {name, value}) {
    const options = update(this.props.options, { $set: {[name]: value} })
    this.setState({
      tps: this.fillTps(name, value),
      factor: this.fillFactor(name, value)
    })
    this.props.onChange(options)
  }

  handleFactorChange (e, {value}) {
    const factor = value
    const interval = 1000 / (factor / this.props.options.stepSize)
    this.setState({
      tps: calculateTps(this.props.options.stepSize, interval),
      factor: factor
    })

    const options = update(this.props.options, { $set: { interval } })
    this.props.onChange(options)
  }

  render () {
    return (
      <Grid columns={2} stretched>
        <Grid.Row>
          <Grid.Column>
            <Form.Field onMouseEnter={(e) => this.props.onMouseEnter('interval')}>
              <label>Interval length</label>
              <InputFloat
                name='interval'
                value={this.props.options.interval}
                onChange={this.handleChange}
              >
                <input />
                <Label basic>ms</Label>
              </InputFloat>
            </Form.Field>

            <Form.Field onMouseEnter={(e) => this.props.onMouseEnter('stepSize')}>
              <label>Time step size</label>
              <InputFloat
                name='stepSize'
                value={this.props.options.stepSize}
                onChange={this.handleChange}
              >
                <input />
                <Label basic>s</Label>
              </InputFloat>
            </Form.Field>
          </Grid.Column>

          <Grid.Column>

            <Form.Field onMouseEnter={(e) => this.props.onMouseEnter('factor')}>
              <label>Realtime factor</label>
              <InputFloat
                name='interval'
                value={this.state.factor}
                onChange={this.handleFactorChange}
              >
                <input />
                <Label basic>x</Label>
              </InputFloat>
            </Form.Field>

            <Form.Field onMouseEnter={(e) => this.props.onMouseEnter('tps')}>
              <label>Model calculation rate</label>
              <p>{this.state.tps} tps</p>
            </Form.Field>

          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default ContinuousMode

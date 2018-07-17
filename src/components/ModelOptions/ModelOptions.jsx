import React, { Component } from 'react'
import { Grid, Form } from 'semantic-ui-react'

import Mode from './options/Mode'
import ContinuousMode from './options/ContinuousMode'

import Docs from './Docs'

import update from 'immutability-helper'

class ModelOptions extends Component {
  constructor (props) {
    super(props)

    this.state = {
      'optionKeyHovered': null
    }

    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOptionsChange = this.handleOptionsChange.bind(this)
  }

  onMouseEnter (optionKeyHovered) {
    this.setState({ optionKeyHovered: optionKeyHovered })
  }

  handleOnChange (e, {name, value}) {
    const options = update(this.props.options, { [name]: {$set: value} })
    this.props.onChange(options)
  }

  handleOptionsChange (options) {
    this.props.onChange(options)
  }

  render () {
    if (!this.props.visible) {
      return null
    }

    return (
      <Form>
        <Grid columns={2} stretched>
          <Grid.Row>

            <Grid.Column>

              <Form.Field>
                <label>Model name (unique)</label>
                <Form.Input
                  name='name'
                  value={this.props.options.name}
                  onChange={this.handleOnChange}
                  disabled
                />
              </Form.Field>

              <Mode
                options={this.props.options}
                onChange={this.handleOptionsChange}
                onMouseEnter={this.onMouseEnter}
              />

              <ContinuousMode
                options={this.props.options}
                onChange={this.handleOptionsChange}
                onMouseEnter={this.onMouseEnter}
              />
            </Grid.Column>

            <Grid.Column>
              <Docs index={this.state.optionKeyHovered} />
            </Grid.Column>

          </Grid.Row>
        </Grid>
      </Form>
    )
  }
}

export default ModelOptions

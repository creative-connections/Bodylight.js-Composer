import React, { Component } from 'react'
import { Grid, Form, Header, Divider } from 'semantic-ui-react'

import Mode from './options/Mode'
import Name from './options/Name'
import ContinuousMode from './options/ContinuousMode'

import Docs from './Docs'

class ModelOptions extends Component {
  constructor (props) {
    super(props)

    this.state = {
      'optionKeyHovered': null
    }

    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.handleOptionsChange = this.handleOptionsChange.bind(this)
  }

  onMouseEnter (optionKeyHovered) {
    this.setState({ optionKeyHovered: optionKeyHovered })
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

              <Name
                options={this.props.options}
                onChange={this.handleOptionsChange}
                onMouseEnter={this.onMouseEnter}
              />

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

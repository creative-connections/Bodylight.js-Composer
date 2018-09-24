import React, { Component, Fragment } from 'react'
import { Dropdown, Grid, Input, Header, Divider } from 'semantic-ui-react'

import ComplexAttribute from '../../../ComplexAttribute'
import GridRow from '../../../GridRow'
import ButtonLink from '@components/ButtonLink'
import generateID from '@helpers/generateID'
import update from 'immutability-helper'

import ColorPicker from '@components/ColorPicker'

class Line extends Component {
  constructor (props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange (e, {name, value}) {
    const config = update(this.props.config, {
      [name]: {$set: value}
    })

    this.props.onChange(null, {
      name: this.props.name,
      value: config
    })
  }

  render () {
    const config = this.props.config
    return <Fragment>
      <GridRow label='color:'>
        <ColorPicker
          name='color'
          value={config.color}
          onChange={this.handleOnChange}
        />
      </GridRow>
    </Fragment>
  }
}

export default Line

import React, { Component, Fragment } from 'react'
import { Input, Checkbox, Dropdown, Grid, Header, Divider } from 'semantic-ui-react'

import ComplexAttribute from '../../../ComplexAttribute'
import GridRow from '../../../GridRow'
import ButtonLink from '@components/ButtonLink'
import generateID from '@helpers/generateID'
import update from 'immutability-helper'
import InputFloat from '@components/InputFloat'
import FunctionEditor from '@components/FunctionEditor'

class Dataset extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const config = this.props.config
    const name = this.props.name
    return <Fragment>

      <Grid verticalAlign='middle' celled='internally'>
        <GridRow label='Name:'>
          <Input
            name={`${name}.name`}
            value={config.name}
            onChange={this.props.onChange}
          />
        </GridRow>

        <GridRow label='y:'>
          { config.y.time === false &&
            <ComplexAttribute
              name={`${name}.y`}
              attribute={config.y}
              onChange={this.props.onChange}
              forceComplex={true}
            />
          }
          <Checkbox
            style={{padding: '0.8em 0em 0.8em 0.0em'}}
            label='y is controlled by time'
            name={`${name}.y.time`}
            checked={config.y.time}
            onChange={this.props.onChange}
          />
        </GridRow>

        <GridRow label='x:'>
          { config.x.time === false &&
            <ComplexAttribute
              name={`${name}.x`}
              attribute={config.x}
              onChange={this.props.onChange}
              forceComplex={true}
            />
          }
          <Checkbox
            style={{padding: '0.8em 0em 0.8em 0.0em'}}
            label='x is controlled by time'
            name={`${name}.x.time`}
            checked={config.x.time}
            onChange={this.props.onChange}
          />
        </GridRow>

        <GridRow label='Mode:'>
          <Input
            name={`${name}.mode`}
            value={config.mode}
            onChange={this.props.onChange}
          />
        </GridRow>

        <GridRow label='Maximum samples:'>
          <ComplexAttribute
            name={`${name}.maxSamples`}
            attribute={config.maxSamples}
            onChange={this.props.onChange}
          />
        </GridRow>

        <GridRow label='Advanced:'>
          <FunctionEditor
            name={`${name}.other`}
            value={config.other}
            onChange={this.props.onChange}
            typeof='object'
            disableRemove={true}
          />
        </GridRow>

        <Divider hidden/>

        <GridRow label='' compact={true}>
          <ButtonLink name={config.id} onClick={this.props.onRemove}>remove dataset</ButtonLink>
        </GridRow>
      </Grid>
    </Fragment>
  }
}

export default Dataset

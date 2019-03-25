import React, { Fragment } from 'react'

import { Grid } from 'semantic-ui-react'

import GridRow from '../GridRow'
import ComplexAttribute from '../ComplexAttribute'

const ControlledMode = props => {
  const config = props.config
  const onChange = props.onChange
  return <Fragment>
    <GridRow border label='Value'>
      <ComplexAttribute
        name='value'
        attribute={config.value}
        onChange={onChange}
      />
    </GridRow>
    <GridRow border label='Maximum'>
      <ComplexAttribute
        name='max'
        attribute={config.max}
        onChange={onChange}
      />
    </GridRow>
    <GridRow border label='Minimum'>
      <ComplexAttribute
        name='min'
        attribute={config.min}
        onChange={onChange}
      />
    </GridRow>
    <GridRow border label='Overflow'>
      <ComplexAttribute simple
        name='overflow'
        label='Allow min/max to be automatically adjusted'
        attribute={config.overflow}
        onChange={onChange}
      />
    </GridRow>
    <GridRow border label='Reversed'>
      <ComplexAttribute
        name='reversed'
        label='Value input is reversed'
        attribute={config.reversed}
        onChange={onChange}
      />
    </GridRow>
  </Fragment>
}

export default ControlledMode
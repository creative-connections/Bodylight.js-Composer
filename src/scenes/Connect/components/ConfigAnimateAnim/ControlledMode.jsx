import React, { Fragment } from 'react'

import { Grid } from 'semantic-ui-react'

import GridRow from '../GridRow'
import ComplexAttribute from '../ComplexAttribute'

const ControlledMode = props => {
  const config = props.config
  const onChange = props.onChange
  return <Fragment>
    <GridRow label='Value:'>
      <ComplexAttribute
        name='value'
        attribute={config.value}
        onChange={onChange}
      />
    </GridRow>
    <GridRow label='Maximum:'>
      <ComplexAttribute
        name='max'
        attribute={config.max}
        onChange={onChange}
      />
    </GridRow>
    <GridRow label='Minimum:'>
      <ComplexAttribute
        name='min'
        attribute={config.min}
        onChange={onChange}
      />
    </GridRow>
    <GridRow label='Overflow:'>
      <ComplexAttribute
        forceSimple={true}
        name='overflow'
        label='Allow min/max to be automatically adjusted'
        attribute={config.overflow}
        onChange={onChange}
      />
    </GridRow>
    <GridRow label='Reversed:'>
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

import React, { Fragment } from 'react'

import { Checkbox } from 'semantic-ui-react'
import GridRow from '@components/GridRow'
import ComplexAttribute from '@components/ComplexAttribute'

const ContinuousMode = props => {
  const config = props.config
  const onChange = props.onChange
  return <Fragment>
    <GridRow border label='Speed'>
      <ComplexAttribute
        name='value'
        attribute={config.value}
        onChange={onChange}
      />
    </GridRow>
    <GridRow border label='Animation trigger'>
      <ComplexAttribute
        label='Animation is running'
        name='trigger'
        attribute={config.trigger}
        onChange={onChange}
      />
      <Checkbox
        label='let animation finish on trigger false'
        name='triggerFinish'
        checked={config.triggerFinish}
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
    <GridRow border label='Minimum speed'>
      <ComplexAttribute
        name='minspeed'
        attribute={config.minspeed}
        onChange={onChange}
      />
    </GridRow>
    <GridRow border label='Maximum speed'>
      <ComplexAttribute
        name='maxspeed'
        attribute={config.maxspeed}
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

export default ContinuousMode

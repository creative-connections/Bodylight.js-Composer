import React, { Component } from 'react'

import { Grid } from 'semantic-ui-react'
import GridRow from '../GridRow'
import ComplexAttribute from '../ComplexAttribute'

const ContinuousMode = props => {
  const config = props.config
  const onChange = props.onChange
  return (
    <div>
      <Grid verticalAlign='middle' celled='internally'>
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
      </Grid>
      <br/><br/>
      <Grid verticalAlign='middle' celled='internally'>
        <GridRow label='Minimum speed:'>
          <ComplexAttribute
            name='minspeed'
            attribute={config.minspeed}
            onChange={onChange}
          />
        </GridRow>
        <GridRow label='Maximum speed:'>
          <ComplexAttribute
            name='maxspeed'
            attribute={config.maxspeed}
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
      </Grid>
    </div>
  )
}

export default ContinuousMode

import React, { Fragment } from 'react'

import GridRow from '../../GridRow'
import ComplexAttribute from '../../ComplexAttribute'
import Collapsable from '../../Collapsable'
import Events from '../../Events'

import Datasets from './Datasets'
import Shapes from './Shapes'
import Axis from './Axis'

const PlotlyChart = props => {

  const config = props.config
  return <Fragment>
      <GridRow label='Enabled'>
        <ComplexAttribute
          name='enabled'
          label='Chart responds to input change'
          attribute={config.enabled}
          onChange={props.onChange}
        />
      </GridRow>

      <Collapsable title='Datasets' className='primary' collapsed={true}>
        <Datasets name='datasets' config={config.datasets} onChange={props.onChange}/>
      </Collapsable>

      <Collapsable title='Axes' className='primary' collapsed={true}>
        <Collapsable title='X Axis' className='secondary' collapsed={false}>
          <Axis name='xaxis' config={config.xaxis} onChange={props.onChange}/>
        </Collapsable>

        <Collapsable title='Y Axis' className='secondary' collapsed={false}>
          <Axis name='yaxis' config={config.yaxis} onChange={props.onChange}/>
        </Collapsable>
      </Collapsable>

      <Collapsable title='Shapes' className='primary' collapsed={true}>
        <Shapes name='shapes' config={config.shapes} onChange={props.onChange}/>
      </Collapsable>

      <Events widget={props.chart} config={config} />

    </Fragment>
}

export default PlotlyChart
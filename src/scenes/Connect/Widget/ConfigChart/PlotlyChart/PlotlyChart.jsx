import React, { Fragment } from 'react'

import GridRow from '../../GridRow'
import ComplexAttribute from '../../ComplexAttribute'
import Collapsable from '../../Collapsable'
import Events from '../../Events'
import InputFloat from '@components/InputFloat'

import Datasets from './Datasets'
import Shapes from '../components/Plotly/Shapes'
import Images from '../components/Plotly/Images'
import Annotations from '../components/Plotly/Annotations'
import Axis from '../components/Plotly/Axis'
import Margin from '../components/Plotly/Margin'
import Legend from '../components/Plotly/Legend'

const PlotlyChart = props => {
  const config = props.config
  const chart = props.chart

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
      <Datasets name='datasets' chart={chart} config={config.datasets} onChange={props.onChange}/>
    </Collapsable>

    <Collapsable title='Axes' className='primary' collapsed={true}>
      <Collapsable title='X Axis' className='secondary' collapsed={true}>
        <Axis name='xaxis' chart={chart} config={config.xaxis} onChange={props.onChange}/>
      </Collapsable>

      <Collapsable title='Y Axis' className='secondary' collapsed={true}>
        <Axis name='yaxis' chart={chart} config={config.yaxis} onChange={props.onChange}/>
      </Collapsable>
    </Collapsable>

    <Collapsable title='Shapes' className='primary' collapsed={true}>
      <Shapes name='shapes' chart={chart} config={config.shapes} onChange={props.onChange}/>
    </Collapsable>

    <Collapsable title='Annotations' className='primary' collapsed={true}>
      <Annotations name='annotations' chart={chart} config={config.annotations} onChange={props.onChange}/>
    </Collapsable>

    <Collapsable title='Images' className='primary' collapsed={true}>
      <Images name='images' chart={chart} config={config.images} onChange={props.onChange}/>
    </Collapsable>

    <Collapsable title='Margin' className='primary' collapsed={true}>
      <Margin name='margin' chart={chart} config={config.margin} onChange={props.onChange}/>
    </Collapsable>

    <Collapsable title='Legend' className='primary' collapsed={true}>
      <Legend name='legend' chart={chart} config={config.legend} onChange={props.onChange}/>
    </Collapsable>

    <GridRow label='Refresh rate [fps]'>
      <InputFloat
        className='inline-block'
        name='fps'
        value={config.fps}
        onChange={props.onChange}
        inverted
      />
    </GridRow>

    <Events widget={props.chart} config={config} />

  </Fragment>
}

export default PlotlyChart

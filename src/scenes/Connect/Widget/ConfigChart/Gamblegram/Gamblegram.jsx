import React, { Fragment } from 'react'
import { Dropdown, Checkbox } from 'semantic-ui-react'

import GridRow from '@components/GridRow'
import ComplexAttribute from '@components/ComplexAttribute'
import Collapsable from '@components/Collapsable'
import InputFloat from '@components/InputFloat'
import Events from '../../Events'

import Columns from './Columns'

import Shapes from '../components/Plotly/Shapes'
import Images from '../components/Plotly/Images'
import Annotations from '../components/Plotly/Annotations'
import Axis from '../components/Plotly/Axis'
import Margin from '../components/Plotly/Margin'
import Legend from '../components/Plotly/Legend'

const barmode = [
  { key: 'relative', text: 'Relative', value: 'relative' },
  { key: 'stack', text: 'Stack', value: 'stack' },
  { key: 'group', text: 'Group', value: 'group' },
  { key: 'overlay', text: 'Overlay', value: 'overlay' },
    ]

const Gamblegram = ({ chart, config, onChange }) => {
  return <Fragment>
      <GridRow border label='Enabled'>
        <ComplexAttribute
          name='enabled'
          label='Chart responds to input change'
          attribute={config.enabled}
          onChange={onChange}
        />
      </GridRow>

      <Collapsable title='Columns' className='primary' collapsed={true}>
        <Columns name='columns' chart={chart} config={config.columns} onChange={onChange}/>
      </Collapsable>

      <Collapsable title='Axes' className='primary' collapsed={true}>
        <Collapsable title='X Axis' className='secondary' collapsed={true}>
          <Axis name='xaxis' chart={chart} config={config.xaxis} onChange={onChange}/>
        </Collapsable>

        <Collapsable title='Y Axis' className='secondary' collapsed={true}>
          <Axis name='yaxis' chart={chart} config={config.yaxis} onChange={onChange}/>
        </Collapsable>
      </Collapsable>

      <Collapsable title='Shapes' className='primary' collapsed={true}>
        <Shapes name='shapes' chart={chart} config={config.shapes} onChange={onChange}/>
      </Collapsable>

      <Collapsable title='Annotations' className='primary' collapsed={true}>
        <Annotations name='annotations' chart={chart} config={config.annotations} onChange={onChange}/>
      </Collapsable>

      <Collapsable title='Images' className='primary' collapsed={true}>
        <Images name='images' chart={chart} config={config.images} onChange={onChange}/>
      </Collapsable>

      <Collapsable title='Margin' className='primary' collapsed={true}>
        <Margin name='margin' chart={chart} config={config.margin} onChange={onChange}/>
      </Collapsable>

      <Collapsable title='Legend' className='primary' collapsed={true}>
        <Legend name='legend' chart={chart} config={config.legend} onChange={onChange}/>
      </Collapsable>

      <GridRow label='Gap between bars (0-1)'>
        <InputFloat
          name='bargap'
          value={config.bargap}
          onChange={onChange}
        />
      </GridRow>

      <GridRow inline label='Bar mode'>
        <Dropdown
          name='barmode'
          value={config.barmode}
          onChange={onChange}
          options={barmode}
        />
      </GridRow>

      <Events widget={chart} config={config} />
    </Fragment>
}

export default Gamblegram
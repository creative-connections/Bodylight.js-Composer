import React, { Fragment } from 'react'
import GridRow from '@scenes/Connect/components/GridRow'
import InputFloat from '@components/InputFloat'
import { Dropdown, Input } from 'semantic-ui-react'
import ColorPicker from '@components/ColorPicker'

const orientation = [
  { key: 'v', text: 'Vertical', value: 'v' },
  { key: 'h', text: 'Horizontal', value: 'h' }
]
const traceorder = [
  { key: 'normal', text: 'Normal', value: 'normal' },
  { key: 'reversed', text: 'Reversed', value: 'reversed' }
]
const xanchor = [
  { key: 'auto', text: 'Auto', value: 'auto' },
  { key: 'left', text: 'Left', value: 'left' },
  { key: 'center', text: 'Center', value: 'center' },
  { key: 'right', text: 'Right', value: 'right' }
]
const yanchor = [
  { key: 'auto', text: 'Auto', value: 'auto' },
  { key: 'top', text: 'Top', value: 'top' },
  { key: 'middle', text: 'Middle', value: 'middle' },
  { key: 'bottom', text: 'Bottom', value: 'bottom' }
]

const Legend = ({ name, config = {}, onChange }) => {
  return <Fragment>
      <GridRow inline label='Orientation'>
        <Dropdown
          name={`${name}.orientation`}
          value={config.orientation}
          onChange={onChange}
          options={orientation}
        />
      </GridRow>

      <GridRow label='x'>
        <InputFloat
          name={`${name}.x`}
          value={config.x}
          onChange={onChange}
        />
      </GridRow>

      <GridRow inline label='x anchor'>
        <Dropdown
          name={`${name}.xanchor`}
          value={config.xanchor}
          onChange={onChange}
          options={xanchor}
        />
      </GridRow>

      <GridRow label='y'>
        <InputFloat
          name={`${name}.y`}
          value={config.y}
          onChange={onChange}
        />
      </GridRow>

      <GridRow inline label='y anchor'>
        <Dropdown
          name={`${name}.yanchor`}
          value={config.yanchor}
          onChange={onChange}
          options={yanchor}
        />
      </GridRow>

      <GridRow inline label='Color'>
        <ColorPicker
          name={`${name}.bgcolor`}
          value={config.bgcolor}
          onChange={onChange}
        />
      </GridRow>

      <GridRow inline label='Border color'>
        <ColorPicker
          name={`${name}.bordercolor`}
          value={config.bordercolor}
          onChange={onChange}
        />
      </GridRow>

      <GridRow label='Font family'>
        <Input
          name={`${name}.font.family`}
          attribute={config.font.family}
          onChange={onChange}
        />
      </GridRow>

      <GridRow label='Font size'>
        <InputFloat
          name={`${name}.font.size`}
          attribute={config.font.size}
          onChange={onChange}
        />
      </GridRow>

      <GridRow inline label='Font color'>
        <ColorPicker
          name={`${name}.font.color`}
          value={config.font.color}
          onChange={onChange}
        />
      </GridRow>

      <GridRow inline label='Order'>
        <Dropdown
          name={`${name}.traceorder`}
          value={config.traceorder}
          onChange={onChange}
          options={traceorder}
        />
      </GridRow>

    </Fragment>
}

export default Legend
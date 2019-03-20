import React, { Fragment } from 'react'
import GridRow from '@components/GridRow'
import InputFloat from '@components/InputFloat'

const Margin = ({ name, config = {}, onChange }) => {
  return <Fragment>
      <GridRow label='Top'>
        <InputFloat name={`${name}.t`} value={config.t} onChange={onChange} />
      </GridRow>
      <GridRow label='Right'>
        <InputFloat name={`${name}.r`} value={config.r} onChange={onChange} />
      </GridRow>
      <GridRow label='Bottom'>
        <InputFloat name={`${name}.b`} value={config.b} onChange={onChange} />
      </GridRow>
      <GridRow label='Left'>
        <InputFloat name={`${name}.l`} value={config.l} onChange={onChange} />
      </GridRow>
      <GridRow label='Pad'>
        <InputFloat name={`${name}.pad`} value={config.pad} onChange={onChange} />
      </GridRow>
    </Fragment>
}

export default Margin
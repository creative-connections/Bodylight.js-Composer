import React, { Fragment } from 'react'

const GridRow = ({label, children}) => {
  return <Fragment>
    <div className='row'>
      {label && <label className='row-label'>{label}</label>}
      <div className='row-content'>{children}</div>
    </div>
  </Fragment>
}

export default GridRow

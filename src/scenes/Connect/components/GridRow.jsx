import React, { Fragment } from 'react'

const GridRow = ({ label, children, border = false, inline = false }) => {
  const rowClassName = border ? 'row dark' : 'row light'
  const labelClassName = inline ? 'row-label inline' : 'row-label'
  const rowContentClassName = inline ? 'row-content inline' : 'row-content'
  return <Fragment>
    <div className={rowClassName}>
      {label && <label className={labelClassName}>{label}</label>}
      <div className={rowContentClassName}>{children}</div>
    </div>
  </Fragment>
}

export default GridRow
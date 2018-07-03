import React from 'react'

const DisplayNotice = ({display = false, level, message}) => {
  if (display) {
    return (
      <div className="displayNotice">
        <p className={level}>{message}</p>
      </div>
    )
  }
  return null
}

export default DisplayNotice

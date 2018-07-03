import React from 'react'

const FileInfo = ({file = null, isDone = true}) => {
  if (!isDone) {
    return <p> ... working ... (todo change me) </p>
  }

  if (file !== null) {
    return (
      <div>
        <h2>Submitted file</h2>
        <li>{file.name} ({file.size}b)</li>
      </div>
    )
  }
  return null
}

export default FileInfo

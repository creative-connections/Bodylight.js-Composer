import React from 'react'
import Dropzone from 'react-dropzone'

const DropZone = ({onDropAccepted, onDropRejected, display = false}) => {
  if (!display) {
    return null
  }

  return (
    <Dropzone multiple={false}
      onDropAccepted={onDropAccepted}
      onDropRejected={onDropRejected}
      accept="application/zip, application/x-zip, application/x-zip-compressed, multipart/x-zip, application/zip-compressed"
    >
      <p>Load .zip file from bodylight.js compiler.</p>
    </Dropzone>
  )
}

export default DropZone

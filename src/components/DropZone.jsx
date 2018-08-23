import React from 'react'
import Dropzone from 'react-dropzone'
import { Image } from 'semantic-ui-react'

const DropZone = ({
  onDropAccepted,
  onDropRejected,
  accept,
  imgSrc,
  description = ''
}) => {
  return <div id='dropzone'>
    <Dropzone
      multiple={false}
      onDropAccepted={onDropAccepted}
      onDropRejected={onDropRejected}
      accept={accept}
      className='dropzone'
    >
      <div>{'Drop files here or click to upload.'}</div>
      <div><Image src={imgSrc} size='small'/></div>
      <div className='description'>{description}</div>
    </Dropzone>
  </div>
}

export default DropZone

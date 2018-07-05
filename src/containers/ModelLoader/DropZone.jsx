import React from 'react'
import Dropzone from 'react-dropzone'

import {Card, Image, Icon} from 'semantic-ui-react'

const DropZone = ({onDropAccepted, onDropRejected, display = false}) => {
  if (!display) {
    return null
  }

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    padding: '2.5em 0',
    textAlign: 'center',
    color: '#fff'
  }

  return (
    <Card>
      <Card.Content>
        <Card.Header>Add an FMU</Card.Header>
        <Card.Description>Upload a .zip from Bodylight.js compiler</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Dropzone multiple={false}
          onDropAccepted={onDropAccepted}
          onDropRejected={onDropRejected}
          accept="application/zip, application/x-zip, application/x-zip-compressed, multipart/x-zip, application/zip-compressed"
        >
          <div style={overlayStyle}>
            <Image src='/images/wafmi.png' size='small'/>
          </div>
        </Dropzone>
      </Card.Content>
    </Card>
  )
}

export default DropZone

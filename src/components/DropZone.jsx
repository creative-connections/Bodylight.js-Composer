import React from 'react'
import Dropzone from 'react-dropzone'

import { Card, Image } from 'semantic-ui-react'

const DropZone = ({onDropAccepted, onDropRejected, accept, imgSrc, header = 'Upload a file', description = '', display = false}) => {
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
        <Card.Header>{header}</Card.Header>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Dropzone multiple={false}
          onDropAccepted={onDropAccepted}
          onDropRejected={onDropRejected}
          accept={accept}
        >
          <div style={overlayStyle}>
            <Image src={imgSrc} size='small'/>
          </div>
        </Dropzone>
      </Card.Content>
    </Card>
  )
}

export default DropZone

import React from 'react'
import SimpleModelTree from './SimpleModelTree'

const ModelInfo = ({modelDescriptionParser = null}) => {
  if (modelDescriptionParser !== null) {
    return <SimpleModelTree
      variables={modelDescriptionParser.variables}
      parameters={modelDescriptionParser.parameters}/>
  }
  return null
}

export default ModelInfo

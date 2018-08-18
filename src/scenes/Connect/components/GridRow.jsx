import React from 'react'

import { Label, Grid, Container } from 'semantic-ui-react'

const renderLabel = label => {
  if (label) {
    return <Label>{label}</Label>
  }
  return null
}

const GridRow = ({label, children, compact = false}) => {
  let style = {}
  if (compact === true) {
    style = { padding: '0em 1em 0em 1em' }
  }
  return <Grid.Row style={{boxShadow: 'none'}}>
    <Grid.Column width={2} style={style}>
      <Container textAlign='right'>
        {renderLabel(label)}
      </Container>
    </Grid.Column>
    <Grid.Column width={14} style={style}>
      <Container textAlign='left'>
        {children}
      </Container>
    </Grid.Column>
  </Grid.Row>
}

export default GridRow

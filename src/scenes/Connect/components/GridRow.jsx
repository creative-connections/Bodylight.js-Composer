import React from 'react'

import { Label, Grid, Container } from 'semantic-ui-react'

const renderLabel = label => {
  if (label) {
    return <Label>{label}</Label>
  }
  return null
}

const GridRow = ({label, children}) => (
  <Grid.Row style={{boxShadow: 'none'}}>
    <Grid.Column width={2}>
      <Container textAlign='right'>
        {renderLabel(label)}
      </Container>
    </Grid.Column>
    <Grid.Column width={14}>
      <Container textAlign='left'>
        {children}
      </Container>
    </Grid.Column>
  </Grid.Row>

)

export default GridRow

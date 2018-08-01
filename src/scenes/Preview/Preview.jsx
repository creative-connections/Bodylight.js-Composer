import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Grid, Segment, Button, Header } from 'semantic-ui-react'

import Builder from '@runtime'

class Preview extends Component {
  constructor (props) {
    super(props)

    this.createPreview()
  }

  createPreview () {
    const builder = new Builder()

    this.src = builder.build()
  }

  render () {
    return (
      <Grid padded centered>
        <Grid.Row centered padded='horizontally'>
          <Grid.Column width={16} style={{ maxWidth: 100 + 'em' }} >
            <Segment>
              <Header>Preview</Header>
              <iframe srcDoc={this.src} width={700} height={500}></iframe>
              <br/>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

function mapStateToProps ({ models, animates }) {
  return {
    models,
    animates
  }
}

export default connect(mapStateToProps)(Preview)

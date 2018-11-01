import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getArrayProvidersFromProvider } from '@reducers'
import Modal from 'react-modal'
import { Button, Icon } from 'semantic-ui-react'

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

class ModalIndexPicker extends Component {
  constructor (props) {
    super(props)

    this.state = {
      opened: false
    }
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.renderModalContents = this.renderModalContents.bind(this)
    this.selectChange = this.selectChange.bind(this)
  }

  selectChange (e) {
    const value = Array.from(e.target.options).filter(o => o.selected).map(o => o.value)
    this.props.onChange(e, {name: this.props.name, value})
  }

  open () {
    this.setState({ opened: true })
  }

  close () {
    this.setState({ opened: false })
  }

  renderModalContents () {
    if (!this.state.opened) {
      return null
    }

    const options = []
    // sort options according to index
    Object.values(this.props.providers).sort((a, b) => a.index - b.index).forEach(provider => {
      options.push(<option key={provider.name} value={provider.name}>{provider.name}</option>)
    })

    const value = this.props.attribute.indexes || []
    return <Fragment>
      <select multiple size={20} autoFocus
        value={value}
        onChange={this.selectChange}
        style={{overflow: 'auto', maxHeight: '25em', minWidth: '200px'}}>
        {options}
      </select>
    </Fragment>
  }

  render () {
    return <Fragment>
      <Button icon labelPosition='left' onClick={this.open}>
        <Icon name='ordered list' />Pick indexes
      </Button>
      <Modal isOpen={this.state.opened} onRequestClose={this.close} style={modalStyle} >
        { this.renderModalContents() }
        <Button labelPosition='left' onClick={this.close}>close</Button>
      </Modal>
    </Fragment>
  }
}

export default connect(
  (state, props) => ({
    providers: getArrayProvidersFromProvider(state, props.attribute.provider)
  }),
  null
)(ModalIndexPicker)

import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getProvidersForDropdown } from '@reducers'
import Modal from 'react-modal'
import { Button, Icon, Input, Segment } from 'semantic-ui-react'

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

class ModalDropdown extends Component {
  constructor (props) {
    super(props)
    Modal.setAppElement('#app')

    this.state = {
      opened: false,
      filter: ''
    }

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.handleAfterOpen = this.handleAfterOpen.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.renderModalContents = this.renderModalContents.bind(this)
  }

  open () {
    this.setState({ opened: true })
  }

  close () {
    this.setState({ opened: false })
  }

  handleAfterOpen () {
  }

  handleSearch (e, { value }) {
    this.setState({ filter: value })
  }

  handleSelect (value) {
    this.props.onChange(null, {
      name: this.props.name,
      value: value
    })
    this.close()
  }

  renderOptions (options) {
    const out = []
    options.forEach(option => {
      out.push(
        <div key={option.value} className='option' onClick={() => this.handleSelect(option.value)}>
          <p>{option.text}</p>
        </div>
      )
    })
    return out
  }

  renderModalContents (selected) {
    const options = []
    let filter = null
    if (this.state.filter !== '') {
      filter = new RegExp(this.state.filter, 'i')
    }

    this.props.options.forEach(option => {
      if (filter) {
        if (option.text.search(filter) > 0) {
          options.push(option)
        }
      } else {
        options.push(option)
      }
    })

    if (this.state.opened) {
      return <Fragment>
        <p>Selected: <strong>{selected}</strong></p>
        <Input placeholder='Search...' onChange={this.handleSearch} autoFocus/>
        <Segment style={{ overflow: 'auto', maxHeight: '25em' }}>
          { this.renderOptions(options) }
        </Segment>
        <Button labelPosition='left' onClick={this.close}>close</Button>
      </Fragment>
    }
    return null
  }

  render () {
    let selected = null
    this.props.options.forEach(option => {
      if (option.value === this.props.value) {
        selected = option.text.replace('.', '. ')
      }
    })

    const text = selected || this.props.text

    return <Fragment>
      <Button
        icon labelPosition='left'
        className='provider-dropdown'
        onClick={this.open}>
        <Icon name='code branch' />{text}
      </Button>

      <Modal
        isOpen={this.state.opened}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.close}
        style={modalStyle}
      >
        {this.renderModalContents(selected)}
      </Modal>
    </Fragment>
  }
}

export default ModalDropdown

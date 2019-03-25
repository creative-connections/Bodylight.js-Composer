import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Segment, Divider, Menu, Input } from 'semantic-ui-react'
import Animates from './components/Animates'
import Items from './components/Items'
import { withRouter } from 'react-router-dom'
import { getWidgetsForTree, getSelectedWidget } from '@reducers'
import { selectWidget } from '@actions'
import WidgetType from '@helpers/enum/WidgetType'

class Tree extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.onSearch = this.onSearch.bind(this)

    this.state = {
      filter: null
    }
  }

  onSearch(e, { value }) {
    let filter = new RegExp(value, 'i')
    if (value === '') {
      filter = null
    }
    this.setState({
      filter
    })
  }

  renderSearch() {
    return <Menu.Item position='right'>
      <Input icon='search' placeholder='Filter...' onChange={this.onSearch}/>
    </Menu.Item>
  }

  renderModels() {
    Object.entries(this.props.models)
  }

  onClick(e) {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    const id = e.currentTarget.dataset.id
    const selected = (this.props.selected && this.props.selected.id) || null
    if (id === selected) {
      this.props.history.push(`${process.env.PATH}/`)
    } else {
      this.props.selectWidget(id)
    }
  }

  render() {
    return <Fragment>

      { this.renderSearch() }
      <Divider id='menu-tree-divider'/>
      <Segment id='menu-tree'>
        <Items name='Model'
          items={this.props.widgets.models}
          type={WidgetType.MODEL}
          selected={this.props.selected}
          filter={this.state.filter}
          onClick={this.onClick}/>
        <Items
          name='Button'
          items={this.props.widgets.buttons}
          type={WidgetType.BUTTON}
          selected={this.props.selected}
          filter={this.state.filter}
          onClick={this.onClick}/>
        <Items
          name='Range'
          items={this.props.widgets.ranges}
          type={WidgetType.RANGE}
          selected={this.props.selected}
          filter={this.state.filter}
          onClick={this.onClick}/>
        <Items
          name='Toggle'
          items={this.props.widgets.toggles}
          type={WidgetType.TOGGLE}
          selected={this.props.selected}
          filter={this.state.filter}
          collapsed={false}
          onClick={this.onClick}/>
        <Items
          name='Chart'
          items={this.props.widgets.charts}
          type={WidgetType.CHART}
          selected={this.props.selected}
          filter={this.state.filter}
          collapsed={false}
          onClick={this.onClick}/>
        <Items
          name='Label'
          items={this.props.widgets.labels}
          type={WidgetType.LABEL}
          selected={this.props.selected}
          filter={this.state.filter}
          collapsed={false}
          onClick={this.onClick}/>
        <Animates
          animates={this.props.widgets.animates}
          selected={this.props.selected}
          filter={this.state.filter}
          onClick={this.onClick}/>
        <Items
          name='Action'
          items={this.props.widgets.actions}
          type={WidgetType.ACTION}
          selected={this.props.selected}
          filter={this.state.filter}
          collapsed={false}
          onClick={this.onClick}/>
      </Segment>
    </Fragment>
  }
}

export default connect(
  state => ({
    widgets: getWidgetsForTree(state),
    selected: getSelectedWidget(state)
  }),
  dispatch => bindActionCreators({
    selectWidget
  }, dispatch)
)(withRouter(Tree))
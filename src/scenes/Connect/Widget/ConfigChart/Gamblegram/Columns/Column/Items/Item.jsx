import React, { Component, Fragment } from 'react'
import { Input, Checkbox } from 'semantic-ui-react'
import GridRow from '@components/GridRow'
import ComplexAttribute from '@components/ComplexAttribute'
import FunctionEditor from '@components/FunctionEditor'
import ButtonLink from '@components/ButtonLink'

class Item extends Component {
  render() {
    const config = this.props.config
    const name = this.props.name
    return <Fragment>
      <GridRow label='Name'>
        <Input
          name={`${name}.name`}
          value={config.name}
          onChange={this.props.onChange}
        />
      </GridRow>

      <GridRow border label='Value'>
        <ComplexAttribute complex array
          name={`${name}.value`}
          attribute={config.value}
          onChange={this.props.onChange}
          />
      </GridRow>

      <GridRow border label='Value'>
        <Checkbox
          label='Display name in item'
          name={`${name}.displayName`}
          checked={config.displayName}
          onChange={this.props.onChange}
        />
      </GridRow>

      <GridRow label='Custom'>
        <FunctionEditor
          name={`${name}.other`}
          value={config.other}
          onChange={this.props.onChange}
          typeof='object'
          disableRemove={true}
        />
      </GridRow>

      <GridRow border label='' compact={true}>
        <ButtonLink name={config.id} onClick={this.props.onRemove}>remove item</ButtonLink>
      </GridRow>
    </Fragment>
  }
}

export default Item
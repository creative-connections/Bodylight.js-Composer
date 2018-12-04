import React, { Component, Fragment } from 'react'
import { Input } from 'semantic-ui-react'
import GridRow from '@scenes/Connect/components/GridRow'
import ComplexAttribute from '@scenes/Connect/components/ComplexAttribute'
import FunctionEditor from '@components/FunctionEditor'

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

      <GridRow label='Custom'>
        <FunctionEditor
          name={`${name}.other`}
          value={config.other}
          onChange={this.props.onChange}
          typeof='object'
          disableRemove={true}
        />
      </GridRow>
    </Fragment>
  }
}

export default Item
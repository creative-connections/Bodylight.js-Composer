import React from 'react'

import { Menu, Icon, Container } from 'semantic-ui-react'

const renderValidation = validation => {
  if (validation.error !== true) {
    return null
  }

  return <Menu.Item>
    <div style={{ height: '100%', textSize: '12px', color: '#d85656' }}>
      {validation.message}
    </div>
  </Menu.Item>
}

const EditorMenu = (props) => {
  return (
    <Menu icon style={{
      boxShadow: 'none',
      borderLeft: '0',
      borderRight: '0',
      borderBottom: '0',
      margin: '0'
    }}>

      {renderValidation(props.validation)}

      <Menu.Menu style={{ boxShadow: 'none' }} position='right'>

        <Menu.Item
          active={props.displaySettings}
          onClick={props.onSettingsClick} >
          <Icon name='cog' />
        </Menu.Item>

        <Menu.Item onClick={props.onCancel} >
          <Icon name='cancel' />
        </Menu.Item>

        <Menu.Item
          disabled={props.validation.error === true}
          onClick={props.onSave}>
          <Icon name='check circle' />
          Save
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default EditorMenu

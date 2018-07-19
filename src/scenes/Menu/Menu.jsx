import React from 'react'

import MenuHeader from './components/MenuHeader'
import ScreenSelector from './components/ScreenSelector'

import { Container, Divider, Menu, Input } from 'semantic-ui-react'

const AppMenu = () => {
  return (
    <Menu vertical fixed='left' style={{width: 250 + 'px'}}>
      <Container>

        <MenuHeader/>
        <ScreenSelector/>

        <Menu.Item position='right'>
          <Input icon='search' placeholder='Search...' />
        </Menu.Item>

        <Divider horizontal>FMU</Divider>
        <Divider horizontal>Animate</Divider>
      </Container>
    </Menu>
  )
}

export default AppMenu

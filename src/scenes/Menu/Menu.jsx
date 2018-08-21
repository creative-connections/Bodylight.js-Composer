import React from 'react'

import { Container, Menu } from 'semantic-ui-react'

import MenuHeader from './components/MenuHeader'
import ScreenSelector from './components/ScreenSelector'
import Tree from './components/Tree'

const AppMenu = () => {
  return (
    <Menu vertical fixed='left' style={{width: 250 + 'px'}}>
      <Container>
        <MenuHeader/>
        <ScreenSelector/>
        <Tree/>
      </Container>
    </Menu>
  )
}

export default AppMenu

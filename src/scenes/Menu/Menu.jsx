import React, {Fragment} from 'react'

import { Container, Menu } from 'semantic-ui-react'

import MenuHeader from './components/MenuHeader'
import ScreenSelector from './components/ScreenSelector'
import Tree from '@scenes/Tree'

const AppMenu = () => {
  return <Fragment>
    <Menu vertical fixed='left' id='main-menu'>
      <Menu.Item header>Bodylight.js Composer</Menu.Item>
      <MenuHeader/>
      <ScreenSelector/>
      <Tree/>
    </Menu>
  </Fragment>
}

export default AppMenu

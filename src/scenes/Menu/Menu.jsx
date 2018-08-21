import React, {Fragment} from 'react'

import { Container, Menu } from 'semantic-ui-react'

import MenuHeader from './components/MenuHeader'
import ScreenSelector from './components/ScreenSelector'
import Tree from './components/Tree'

const AppMenu = () => {
  return (
    <Menu vertical fixed='left' id='main-menu'>
      <Fragment>
        <MenuHeader/>
        <ScreenSelector/>
        <Tree/>
      </Fragment>
    </Menu>
  )
}

export default AppMenu

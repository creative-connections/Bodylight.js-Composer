import grapesjs from 'grapesjs'

import loadColumnContainer from './Components/ColumnContainer.js'
import loadRowContainer from './Components/RowContainer.js'
import loadItem from './Components/Item.js'

export default grapesjs.plugins.add('gjs-blocks-flexblocks', (editor, config = {}) => {

  const defaults = {

    // Use this to extend the default flex column container
    ColumnContainer: {},

    // Use this to extend the default flex row container
    RowContainer: {},

    // Use this to extend the default flexbox item
    Item: {},

    // Classes prefix
    stylePrefix: 'flexblocks',
  }

  const opts = { ...config, ...defaults }

  loadColumnContainer(editor, opts)
  loadRowContainer(editor, opts)
  loadItem(editor, opts)
})

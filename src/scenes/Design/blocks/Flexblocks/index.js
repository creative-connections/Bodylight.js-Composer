import grapesjs from 'grapesjs'

import loadColumnContainer from './Components/ColumnContainer.js'
import loadRowContainer from './Components/RowContainer.js'
import loadItem from './Components/Item.js'

import generateClasses from './classes'
import generateStyles from './styles'
import resizers from './resizers'

export default grapesjs.plugins.add('gjs-blocks-flexblocks', (editor, config = {}) => {
  const classes = generateClasses('flexblocks')
  const styles = generateStyles(classes)

  const attr =  {
    columnContainer: {
      class: classes.columnContainer,
      'data-gjs-droppable': `.${classes.item}`,
      'data-gjs-resizable': resizers.columnContainer,
      'data-gjs-custom-name': 'Column container',
    },
    rowContainer: {
      class: classes.rowContainer,
      'data-gjs-droppable': `.${classes.item}`,
      'data-gjs-resizable': resizers.rowContainer,
      'data-gjs-custom-name': 'Row container',
    },
    item: {
      class: classes.item,
      'data-gjs-draggable': `.${classes.columnContainer}, .${classes.rowContainer}`,
      'data-gjs-resizable': resizers.item,
      'data-gjs-custom-name': 'Row / Column',
    }
  }

  const defaults = {

    // Use this to extend the default flex column container
    ColumnContainer: {},

    // Use this to extend the default flex row container
    RowContainer: {},

    // Use this to extend the default flexbox item
    Item: {},

    classes,
    attr,
    styles
  }

  const opts = { ...config, ...defaults }

  loadColumnContainer(editor, opts)
  loadRowContainer(editor, opts)
  loadItem(editor, opts)
})

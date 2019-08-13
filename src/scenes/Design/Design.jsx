import React, { Component } from 'react'
import configureStore, { observeStore, storeInvalidateGroup } from '@src/configureStore'

import 'grapesjs/dist/css/grapes.min.css'
import grapesjs from 'grapesjs'

import gjsPresetWebsite from 'grapesjs-preset-webpage'
import gjsBlocksBasic from 'grapesjs-blocks-basic'
import gjsReduxStorage from './storage/redux'

import gjsBlocksFlexblocks from './blocks/Flexblocks/'

import animateBlock from './blocks/Animate'
import buttonBlock from './blocks/Button'
import rangeBlock from './blocks/Range'
import toggleBlock from './blocks/Toggle'
import chartBlock from './blocks/Chart'
import labelBlock from './blocks/Label'
import cssBlock from './blocks/Css'
import modelBlock from './blocks/Model'
import actionBlock from './blocks/Action'

import connectPanel from './panels/connect'

import { editorStorageClear } from '@actions/actions'

import moment from 'moment'

class Design extends Component {
  constructor(props) {
    super(props)

    this.ref = React.createRef()
  }

  componentDidMount() {
    createjs.Ticker.framerate = 13

    const editor = grapesjs.init({
      container: this.ref.current,

      components: '',
      fromElement: false,

      height: '100vh',
      width: 'auto',

      autorender: 0,

      storageManager: {
        id: '',
        type: 'redux',
        stepsBeforeSave: 0
      },

      plugins: [
        'gjs-redux-storage',
        'gjs-blocks-flexblocks',
        'gjs-blocks-basic'
      ],

      keymaps: {
        defaults: {
          'core:component-delete': {
            keys: '',
            handler: 'core:component-delete'
          }
        }
      },

      pluginsOpts: {
        'gjs-blocks-basic': {
          blocks: ['text', 'link', 'image', 'video', 'map']
        }
      },

      assetManager: {
        embedAsBase64: true,
      },

      styleManager : {
        sectors: [{
          name: 'General',
          open: false,
          buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom']
        },{
          name: 'Flex',
          open: false,
          buildProps: [
            'flex-direction',
            'flex-wrap',
            'justify-content',
            'align-items',
            'align-content',
            'order',
            'flex-basis',
            'flex-grow',
            'flex-shrink',
            'align-self'
          ]
        },{
          name: 'Dimension',
          open: false,
          buildProps: [ 'width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
        },{
          name: 'Typography',
          open: false,
          buildProps: [
            'font-family',
            'font-size',
            'font-weight',
            'letter-spacing',
            'color',
            'line-height',
            'text-shadow'
          ],
        },{
          name: 'Decorations',
          open: false,
          buildProps: [
            'border-radius-c',
            'background-color',
            'border-radius',
            'border',
            'box-shadow',
            'background'
          ],
        },{
          name: 'Extra',
          open: false,
          buildProps: [
            'transition',
            'perspective',
            'transform',
            'overflow-x',
            'overflow-y',
            'overflow'
          ],
        }],
      },
    })

    const cmdCanvasClear = 'canvas-clear'
    editor.Commands.add(cmdCanvasClear,
      e => confirm('This will clear the entire design, continue?') &&
    e.runCommand('core:canvas-clear'))
    editor.Panels.addButton('options', {
      id: cmdCanvasClear,
      className: 'fa fa-trash',
      command: e => {
        e.runCommand(cmdCanvasClear)
        const { store } = configureStore()
        store.dispatch(editorStorageClear())
      }
    })

    editor.Panels.addButton('options', {
      id: 'build-date',
      className: 'build-date',
      command: null,
      attributes: {},
      label: moment(__BUILD_DATE__).format('[built:] YYYY-MM-DD HH:mm:ss')
    })

    const fullscreenBtn = editor.Panels.getButton('options', 'fullscreen')
    fullscreenBtn.collection.remove(fullscreenBtn)

    connectPanel(editor)

    animateBlock(editor)
    rangeBlock(editor)
    buttonBlock(editor)
    toggleBlock(editor)
    chartBlock(editor)
    labelBlock(editor)
    modelBlock(editor)
    actionBlock(editor)
    cssBlock(editor)

    editor.render()

    observeStore(state => state.widgets.app.selected, () => {
      editor.Panels.getButton('views', 'open-connect').set('active', true)
    }, false, 'editor')

    this.unsubscribeSidebar = observeStore(state => state.sidebar, () => {
      editor.Panels.getButton('views', 'open-connect').set('active', true)
    }, true, 'editor')

    editor.on('component:clone', model => {
      model.cloned = true
    })

    /*
     * We most likely want to open the Style Manager if we are not selecting our
     * own block or component. Otherwise handleClick applies on the component.
     */
    editor.on('component:selected', model => {
      const inited = model && model.view && model.view.inited
      if (!inited) {
        editor.Panels.getButton('views', 'open-sm').set('active', true)
      }
    })

    editor.Panels.getButton('views', 'open-blocks').set('active', true)

    this.editor = editor
  }

  componentWillUnmount() {
    this.editor.destroy()
    storeInvalidateGroup('editor')
  }

  render() {
    return <div ref={this.ref} />
  }
}

export default Design

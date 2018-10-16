import grapesjs from 'grapesjs'

import configureStore from '@src/configureStore'

import { editorStorageStore } from '@actions/actions'

export default grapesjs.plugins.add('gjs-redux-storage', (editor, opts = {}) => {
  editor.StorageManager.add('redux', {
    load: function (keys, clb, clbErr) {
      const {store} = configureStore()
      const state = store.getState()

      let data = {}
      let found = false
      keys.forEach(key => {
        if (state.editorStorage[key]) {
          found = true
          data[key] = state.editorStorage[key]
        }
      })

      // add default template if no data loaded
      if (!found) {
        const blockManager = editor.BlockManager
        const domComponents = editor.DomComponents
        const wrapperChildren = domComponents.getComponents()
        const flexbox = blockManager.get('flexbox')
        wrapperChildren.add(flexbox.attributes.content)
      }

      clb(data)
    },
    store: function (data, clb, clbErr) {
      const {store} = configureStore()
      store.dispatch(editorStorageStore(data))
      clb()
    }
  })
})

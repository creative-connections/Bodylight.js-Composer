import grapesjs from 'grapesjs'

import configureStore from '@src/configureStore'

import { editorStorageStore } from '@actions/actions'

export default grapesjs.plugins.add('gjs-redux-storage', (editor, opts = {}) => {
  editor.StorageManager.add('redux', {
    load: (keys, clb) => {
      const {store} = configureStore()
      const state = store.getState()

      let data = {}
      keys.forEach(key => {
        if (state.editorStorage[key]) {
          data[key] = state.editorStorage[key]
        }
      })

      clb(data)
    },
    store: (data, clb) => {
      const {store} = configureStore()
      store.dispatch(editorStorageStore(data))
      clb()
    }
  })
})

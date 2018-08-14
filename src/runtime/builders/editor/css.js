import configureStore from '@src/configureStore'

import {
  getEditorStorage
} from '@reducers'

export default () => {
  const storage = getEditorStorage(configureStore().store.getState())
  return storage.css
}

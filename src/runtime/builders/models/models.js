import configureStore from '@src/configureStore'
import {
  configGetAllModels
} from '@reducers'

/*
 * We need to rename the model JavaScript, since it creates a variable with
 * 'name' on initialization. But we might have multiple instances of the same
 * model, therefore we need to rename it.
 */
const renameModelToID = (js, name, id) => {
  /*
   * TODO: replace with something more sophisticated (AST)
   */
  js = js.replace(name, id)
  return js
}

export default (append, tpl) => {
  const state = configureStore().store.getState()
  const models = configGetAllModels(state)

  Object.entries(models).forEach(([id, config]) => {
    const js = renameModelToID(config.js, config.originalName, id)
    append(js)
    append(`models.${id} = ${id}`)
  })
}

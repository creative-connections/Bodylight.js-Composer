import configureStore from '@src/configureStore'
import { configGetAllModels } from '@reducers'

export default (append, tpl) => {
  const state = configureStore().store.getState()
  const models = configGetAllModels(state)

  Object.entries(models).forEach(([id, config]) => {
    append(`models["${id}"] = ${config.js}`)
  })
}

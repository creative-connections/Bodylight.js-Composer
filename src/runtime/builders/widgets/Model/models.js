import configureStore from '@src/configureStore'
import { configGetAllModels } from '@reducers'

export default () => {
  const state = configureStore().store.getState()
  const models = configGetAllModels(state)

  let out = ''
  Object.entries(models).forEach(([id, config]) => {
    out = out + `;models["${id}"] = ${config.js}`
  })
  return out
}

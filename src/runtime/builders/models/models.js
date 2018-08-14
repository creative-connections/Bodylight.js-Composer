import configureStore from '@src/configureStore'
import {
  getModels
} from '@reducers'

export default (append, tpl) => {
  const models = getModels(configureStore().store.getState())

  Object.entries(models).forEach(([name, model]) => {
    append(model.js)
    append(`models.${name} = ${name}`)
  })
}

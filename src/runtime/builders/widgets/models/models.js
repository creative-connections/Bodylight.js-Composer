import configureStore from '@src/configureStore'
import {
  configGetAllModels
} from '@reducers'

const functionalize = (js, name) => {
  /*
   * js contents (simplified): var name = function(name) {...}; {module export}
   */
  const fn = `${js} ;return ${name}`
  const fun = new Function(fn)
  return fun
}

export default (append, tpl) => {
  const state = configureStore().store.getState()
  const models = configGetAllModels(state)

  Object.entries(models).forEach(([id, config]) => {
    const js = functionalize(config.js, config.originalName)
    append(`models.${id} = ${tpl(js)}`)
  })
}

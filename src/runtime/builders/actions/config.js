import configureStore from '@src/configureStore'
import { getActions } from '@reducers'

const functionalize = action => {
  let args = ''
  // iterate to preserve parameter order
  for (let i = 0; i < action.args.length; i++) {
    args += action.args[i].name
    if (i + 1 !== action.args.length) {
      args += ','
    }
  }
  const fn = `(${args}) => {${action.function}}`
  return new Function(`return ${fn}`)()
}

export default () => {
  const actions = getActions(configureStore().store.getState())
  const config = {}
  Object.entries(actions).forEach(([id, action]) => {
    config[id] = functionalize(action)
  })
  return config
}

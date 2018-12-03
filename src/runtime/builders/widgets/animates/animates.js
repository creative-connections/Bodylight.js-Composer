import configureStore from '@src/configureStore'
import AnimateRuntime from '@runtime/AnimateRuntime'
import {
  configGetAllAnimates
} from '@reducers'

export default (append, tpl) => {
  const animates = configGetAllAnimates(configureStore().store.getState())

  Object.entries(animates).forEach(([id, animate]) => {
    let source = AnimateRuntime.functionalizeSource(animate.js)
    append(`animates['${id}'] = {
      source: ${tpl(source)},
      root: '${animate.originalName}'
    }`)
  })
}
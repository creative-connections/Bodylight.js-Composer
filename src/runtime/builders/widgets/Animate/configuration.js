import configureStore from '@src/configureStore'
import AnimateRuntime from '@runtime/builders/widgets/Animate/AnimateRuntime'
import generateTemplate from '@runtime/builders/generateTemplate'
import { configGetAllAnimates } from '@reducers'

export default () => {
  const animates = configGetAllAnimates(configureStore().store.getState())

  let out = ''

  Object.entries(animates).forEach(([id, animate]) => {
    let source = AnimateRuntime.functionalizeSource(animate.js)
    out = out + `animates['${id}'] = {
      source: ${generateTemplate(source)},
      root: '${animate.originalName}'
    };`
  })

  return out
}

import configureStore from '@src/configureStore'
import { getJavascripts } from '@reducers'

export default () => {
  const store = configureStore().store.getState()

  let javascript = {
    onBeforeModelRun: []
  }

  Object.entries(getJavascripts(store)).forEach(([, item]) => {
    const fn = `function() {${item.javascript}}`
    javascript.onBeforeModelRun.push(new Function(`return ${fn}`)())
  })

  return javascript
}

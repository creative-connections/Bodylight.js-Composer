import configureStore from '@src/configureStore'
import { getCsss } from '@reducers'

export default () => {
  const store = configureStore().store.getState()

  let css = ''
  Object.entries(getCsss(store)).forEach(([, item]) => {
    css = `${css} ${item.css}`
  })

  return css
}

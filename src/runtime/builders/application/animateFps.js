import configureStore from '@src/configureStore'
import { getAnimateFps } from '@reducers'

export default () => {
  const state = configureStore().store.getState()
  return getAnimateFps(state)
}

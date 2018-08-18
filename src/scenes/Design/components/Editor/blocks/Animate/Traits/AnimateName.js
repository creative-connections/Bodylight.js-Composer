import { ANIMATE_NAME, addPrefix, stripPrefix } from '../types'
import { getAnimates } from '@reducers'
import { getInputEl, onValueChange } from '../../commons/Traits/name'

export default editor => {
  editor.TraitManager.addType(ANIMATE_NAME, {
    getInputEl: function () {
      return getInputEl(this, addPrefix, getAnimates)
    },
    onValueChange (model, value, opts = {}) {
      return onValueChange(this, stripPrefix, model, value, opts)
    }
  })
}

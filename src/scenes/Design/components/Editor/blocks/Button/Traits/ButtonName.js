import { BUTTON_NAME, addPrefix, stripPrefix } from '../types'
import { getButtons } from '@reducers'
import { getInputEl, onValueChange } from '../../commons/Traits/name'

export default editor => {
  editor.TraitManager.addType(BUTTON_NAME, {
    getInputEl: function () {
      return getInputEl(this, addPrefix, getButtons)
    },

    onValueChange (model, value, opts = {}) {
      return onValueChange(this, stripPrefix, model, value, opts)
    }

  })
}

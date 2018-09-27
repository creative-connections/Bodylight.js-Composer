import { LABEL_ID } from '../types'
import { getLabels } from '@reducers'
import { getInputEl, onValueChange } from '../../commons/Traits/id'

export default editor => {
  editor.TraitManager.addType(LABEL_ID, {
    getInputEl: function () {
      return getInputEl(this, getLabels)
    },

    onValueChange (model, value, opts = {}) {
      return onValueChange(this, model, value, opts)
    }
  })
}

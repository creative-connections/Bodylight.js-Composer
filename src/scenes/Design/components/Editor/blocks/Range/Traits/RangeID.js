import { RANGE_ID } from '../types'
import { getRanges } from '@reducers'
import { getInputEl, onValueChange } from '../../commons/Traits/id'

export default editor => {
  editor.TraitManager.addType(RANGE_ID, {
    getInputEl: function () {
      return getInputEl(this, getRanges)
    },
    onValueChange (model, value, opts = {}) {
      return onValueChange(this, model, value, opts)
    }
  })
}

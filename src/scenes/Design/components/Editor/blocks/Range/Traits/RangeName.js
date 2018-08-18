import { RANGE_NAME, addPrefix, stripPrefix } from '../types'
import { getRanges } from '@reducers'
import { getInputEl, onValueChange } from '../../commons/Traits/name'

export default editor => {
  editor.TraitManager.addType(RANGE_NAME, {
    getInputEl: function () {
      return getInputEl(this, addPrefix, getRanges)
    },
    onValueChange (model, value, opts = {}) {
      return onValueChange(this, stripPrefix, model, value, opts)
    }
  })
}

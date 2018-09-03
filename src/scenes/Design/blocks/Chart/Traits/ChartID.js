import { CHART_ID } from '../types'
import { getCharts } from '@reducers'
import { getInputEl, onValueChange } from '../../commons/Traits/id'

export default editor => {
  editor.TraitManager.addType(CHART_ID, {
    getInputEl: function () {
      return getInputEl(this, getCharts)
    },

    onValueChange (model, value, opts = {}) {
      return onValueChange(this, model, value, opts)
    }
  })
}

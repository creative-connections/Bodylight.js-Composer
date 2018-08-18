import addRange from './Components/Range'
import addRangeName from './Traits/RangeName'

import { RANGE } from './types.js'

export default editor => {
  addRange(editor)
  addRangeName(editor)

  const blockManager = editor.BlockManager

  blockManager.add('range-block', {
    label: `
      <div class="gjs-block-label">Range</div>
    `,
    content: {
      type: RANGE,
      style: {
        width: '100%'
      },
      removable: true
    }
  })
}

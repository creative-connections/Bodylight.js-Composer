import addRange from './Components/Range'
import addRangeID from './Traits/RangeID'

import { RANGE } from './types.js'

export default editor => {
  addRange(editor)
  addRangeID(editor)

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

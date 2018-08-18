import addButton from './Components/Button'
import addButtonName from './Traits/ButtonName'

import { BUTTON } from './types.js'

export default editor => {
  addButton(editor)
  addButtonName(editor)

  const blockManager = editor.BlockManager

  blockManager.add('button-block', {
    label: `
      <div class="gjs-block-label">Button</div>
    `,
    content: {
      type: BUTTON,
      style: {
      },
      removable: true
    }
  })
}

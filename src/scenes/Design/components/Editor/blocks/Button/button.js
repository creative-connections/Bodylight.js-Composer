import addButton from './Components/Button'
import addButtonID from './Traits/ButtonID'

import { BUTTON } from './types.js'

export default editor => {
  addButton(editor)
  addButtonID(editor)

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

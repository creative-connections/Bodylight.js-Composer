import addAnimateCanvas from './Components/AnimateCanvas'
import addAnimateID from './Traits/AnimateID'

import { ANIMATE_CANVAS } from './types.js'

export default (editor) => {
  addAnimateID(editor)
  addAnimateCanvas(editor)

  const blockManager = editor.BlockManager

  blockManager.add('animate-block', {
    label: 'Animate',
    content: {
      type: ANIMATE_CANVAS,
      style: {
        width: '100%'
      },
      removable: true
    }
  })
}

import addAnimate from './Components/Animate'
import addAnimateName from './Traits/AnimateName'

import { ANIMATE } from './types.js'

export default (editor) => {
  addAnimateName(editor)
  addAnimate(editor)

  const blockManager = editor.BlockManager

  blockManager.add('animate-block', {
    label: `
      <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="m0 0.3v23.4h24v-23.4zm1 1h22v21.4h-22z" clip-rule="evenodd" fill-rule="evenodd" stroke-width=".1"/>
        <path d="m6.7 13.54-0.8 2.99c-0.02 0.08-0.05 0.09-0.15 0.09h-1.47c-0.1 0-0.12-0.03-0.1-0.15l2.85-9.96c0.05-0.18 0.08-0.29 0.1-0.79 0-0.07 0.03-0.1 0.08-0.1h2.1c0.07 0 0.1 0.02 0.12 0.1l3.19 10.77c0.02 0.08 0 0.13-0.08 0.13h-1.65c-0.08 0-0.13-0.01-0.15-0.07l-0.83-3.01zm2.79-1.65c-0.28-1.11-0.94-3.52-1.19-4.7h-0.02c-0.21 1.17-0.74 3.14-1.16 4.7zm4.07-1.75c0-0.1 0-0.45-0.05-1.03 0-0.07 0.02-0.08 0.09-0.12 0.84-0.31 1.94-0.66 3.08-0.66 1.41 0 2.95 0.55 2.95 2.96v5.2c0 0.1-0.03 0.13-0.12 0.13h-1.5c-0.1 0-0.13-0.05-0.13-0.13v-5.06c0-0.96-0.34-1.49-1.33-1.49-0.43 0-0.84 0.08-1.13 0.18v6.39c0 0.07-0.03 0.12-0.1 0.12h-1.63c-0.08 0-0.12-0.03-0.12-0.12v-6.37z" clip-rule="evenodd" fill-rule="evenodd" stroke-width=".1"/>
      </svg>
      <div class="gjs-block-label">Animate</div>
    `,
    content: {
      type: ANIMATE,
      style: {
        width: '100%',
        height: '100%'
      },
      removable: true
    }
  })
}

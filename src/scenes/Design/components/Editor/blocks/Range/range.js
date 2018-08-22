import addRange from './Components/Range'
import addRangeID from './Traits/RangeID'

import { RANGE } from './types.js'

export default editor => {
  addRange(editor)
  addRangeID(editor)

  const blockManager = editor.BlockManager

  blockManager.add('range-block', {
    label: `
      <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(0,-290.65)">
          <path d="m-2.061e-4 299.39v2.0587h0.62853v-0.56519h7.1023l-1.9181 1.5969v2.293c0 0.38867 0.31304 0.70188 0.70187 0.70188h2.4325c0.38884 0 0.70187-0.31296 0.70187-0.70188v-2.293l-1.9181-1.597h15.77v0.5652h0.49954v-2.0587h-0.49954v0.61206h-22.872v-0.61206z"/>
        </g>
      </svg>
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

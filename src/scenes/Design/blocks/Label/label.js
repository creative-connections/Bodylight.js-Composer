import addLabel from './Components/Label'
import addLabelID from './Traits/LabelID'

import { LABEL } from './types.js'

export default editor => {
  addLabel(editor)
  addLabelID(editor)

  const blockManager = editor.BlockManager

  blockManager.add('label-block', {
    label: `
      <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g transform="matrix(.78487 0 0 .78487 2.5815 2.5813)" aria-label="L">
        <path d="m4.9092 21.324v-1.0969h0.33952q0.88799 0 1.5148-0.31341 0.62681-0.33952 0.62681-1.567v-12.693q0-1.2275-0.62681-1.5409-0.62681-0.33952-1.5148-0.33952h-0.33952v-1.0969h7.6001v1.0969h-0.33952q-0.86187 0-1.5148 0.31341-0.62681 0.31341-0.62681 1.4626v14.469h5.1451q0.78352 0 1.2536-0.33952 0.49623-0.36564 0.73128-0.88798 0.23506-0.54846 0.31341-1.123l0.26117-1.9588h1.3581l-0.18282 5.6152z" stroke-width="1.2242"/>
        </g>
      </svg>
      <div class="gjs-block-label">Label</div>
    `,
    content: {
      type: LABEL,
      style: {
      },
      removable: true
    }
  })
}

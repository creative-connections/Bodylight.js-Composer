import addToggle from './Components/Toggle'
import addToggleID from './Traits/ToggleID'

import { TOGGLE } from './types.js'

export default editor => {
  addToggle(editor)
  addToggleID(editor)

  const blockManager = editor.BlockManager

  blockManager.add('toggle-block', {
    label: `
      <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(0,-290.65)">
          <rect x=".7204" y="298.89" width="22.559" height="7.5197" ry="1.7236" fill="none" stroke="#FFF" stroke-linejoin="bevel" stroke-width=".71612"/>
          <g stroke-width=".94737" aria-label="OK">
           <path d="m10.315 304.45q-0.30933 0-0.57067-0.12266-0.256-0.128-0.44267-0.36267-0.18133-0.23467-0.28267-0.57067-0.10133-0.336-0.10133-0.76266 0-0.42667 0.10133-0.75734 0.10133-0.336 0.28267-0.56 0.18667-0.22933 0.44267-0.34666 0.26133-0.12267 0.57067-0.12267 0.30933 0 0.56533 0.12267 0.26133 0.11733 0.44267 0.34666 0.18667 0.22934 0.288 0.56534 0.10133 0.33066 0.10133 0.752 0 0.42666-0.10133 0.76266-0.10133 0.336-0.288 0.57067-0.18133 0.23467-0.44267 0.36267-0.256 0.12266-0.56533 0.12266zm0-0.67733q0.272 0 0.432-0.304 0.16-0.30933 0.16-0.83733 0-0.52267-0.16-0.816-0.16-0.29334-0.432-0.29334t-0.432 0.29334q-0.16 0.29333-0.16 0.816 0 0.528 0.16 0.83733 0.16 0.304 0.432 0.304z"/>
           <path d="m12.277 300.91h0.79467v1.424h0.016l1.0293-1.424h0.864l-1.04 1.3867 1.1413 2.0907h-0.86933l-0.736-1.4667-0.40533 0.53333v0.93333h-0.79467z"/>
          </g>
        </g>
      </svg>
      <div class="gjs-block-label">Toggle</div>
    `,
    content: {
      type: TOGGLE,
      style: {
      },
      removable: true
    }
  })
}

import addChart from './Components/Chart'
import addChartID from './Traits/ChartID'

import { CHART } from './types.js'

export default editor => {
  addChart(editor)
  addChartID(editor)

  const blockManager = editor.BlockManager

  blockManager.add('chart-block', {
    label: `
      <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
       <rect x="1.5043" y="20.264" width="19.496" height=".73597" stroke-width="1.1839"/>
       <rect transform="rotate(-90)" x="-22.502" y="3" width="19.502" height=".73597" stroke-width="1.1841"/>
       <path d="m20.887 10.514-6.7168 1.5664-2.6758 2.9883-4.625 0.78516-2.2773 3.2012 0.81641 0.57812 2.0352-2.8613 4.5625-0.77734 2.6992-3.0117 6.4082-1.4961z" color-rendering="auto" dominant-baseline="auto" image-rendering="auto" shape-rendering="auto" solid-color="#000000"/>
       <path d="m20.742 5.8535-4.2734 2.582-3.2227-1.4844-2.7617 2.127-3.043-0.80859-2.2832-2.1934-0.69141 0.72266 2.4668 2.3691 3.7695 1.0039 2.6758-2.0605 3.1523 1.4531 4.7266-2.8555z" color-rendering="auto" dominant-baseline="auto" image-rendering="auto" shape-rendering="auto" solid-color="#000000"/>
      </svg>
      <div class="gjs-block-label">Chart</div>
    `,
    content: {
      type: CHART,
      removable: true,
      activeOnRender: 1
    }
  })
}

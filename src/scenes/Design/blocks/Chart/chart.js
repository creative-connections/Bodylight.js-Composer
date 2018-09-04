import addChart from './Components/Chart'
import addChartID from './Traits/ChartID'

import { CHART } from './types.js'

export default editor => {
  addChart(editor)
  addChartID(editor)

  const blockManager = editor.BlockManager

  blockManager.add('chart-block', {
    label: `
      <div class="gjs-block-label">Chart</div>
    `,
    content: {
      type: CHART,
      style: {
      },
      removable: true
    }
  })
}

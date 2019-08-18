import generateTemplate from '@runtime/builders/generateTemplate'

import CSS from './template/css'
import HTML from './template/html'

import PerformanceOn from './template/PerformanceOn'
import PerformanceOff from './template/PerformanceOff'
import PerformanceWindow from './template/PerformanceWindow'

export default (enabled = false) => {
  let script = ''

  if (enabled) {
    script = `
      ${generateTemplate(PerformanceOn)}
      ${generateTemplate(PerformanceWindow)}
      const performanceWindow = new PerformanceWindow()
    `
  } else {
    script = generateTemplate(PerformanceOff)
  }

  script = script + `;const perf = new Performance()`

  const html = HTML(enabled)
  const css = CSS(enabled)

  return { script, html, css }
}

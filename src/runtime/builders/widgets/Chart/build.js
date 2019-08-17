import generateTemplate from '../generateTemplate'

import configuration from './configuration'
import init from './template/init'

import PlotlyBase from './template/PlotlyBase'
import PlotlyChart from './template/PlotlyChart'
import Gamblegram from './template/Gamblegram'

export default () => {
  const script = `
    config.widgets.charts = ${generateTemplate(configuration())}
    ${generateTemplate(PlotlyBase)}
    ${generateTemplate(PlotlyChart)}
    ${generateTemplate(Gamblegram)}
    ${generateTemplate(init)}
  `
  const html = ''
  const css = ''

  return { script, html, css }
}

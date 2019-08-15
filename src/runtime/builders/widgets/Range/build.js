import generateTemplate from '../generateTemplate'

import configuration from './configuration'
import Range from './template/Range'
import init from './template/init'

export default () => {
  const script = `
    config.widgets.ranges = ${generateTemplate(configuration())}
    ${generateTemplate(Range)}
    ${generateTemplate(init)}
  `
  const css = ''

  return { script, css }
}

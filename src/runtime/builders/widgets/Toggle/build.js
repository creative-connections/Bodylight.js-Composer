import generateTemplate from '../generateTemplate'

import configuration from './configuration'
import Toggle from './template/Toggle'
import init from './template/init'

export default () => {
  const script = `
    config.widgets.toggles = ${generateTemplate(configuration())}
    ${generateTemplate(Toggle)}
    ${generateTemplate(init)}
  `
  const css = ''

  return { script, css }
}

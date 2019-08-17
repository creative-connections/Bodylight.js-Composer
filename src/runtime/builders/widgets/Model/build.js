import generateTemplate from '../generateTemplate'

import configuration from './configuration'

export default () => {
  const script = `
    config.models = ${generateTemplate(configuration())}
  `
  const html = ''
  const css = ''

  return { script, html, css }
}

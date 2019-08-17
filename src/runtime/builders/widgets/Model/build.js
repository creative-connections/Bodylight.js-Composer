import generateTemplate from '../generateTemplate'

import configuration from './configuration'
import models from './models'

export default () => {
  const script = `
    config.models = ${generateTemplate(configuration())}

    const models = {}
    ${models()}
  `
  const html = ''
  const css = ''

  return { script, html, css }
}

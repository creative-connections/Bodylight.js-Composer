import generateTemplate from '../generateTemplate'

import configuration from './configuration'
import models from './models'
import createModelRuntime from './createModelRuntime'

export default () => {
  const script = `
    config.models = ${generateTemplate(configuration())}

    const models = {}
    ${models()}

    ${generateTemplate(createModelRuntime)}
  `
  const html = ''
  const css = ''

  return { script, html, css }
}

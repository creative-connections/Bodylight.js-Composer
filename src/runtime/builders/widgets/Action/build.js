import generateTemplate from '@runtime/builders/generateTemplate'
import configuration from './configuration'

export default () => {
  const script = `config.actions = ${generateTemplate(configuration())}`
  const html = ''
  const css = ''

  return { script, html, css }
}

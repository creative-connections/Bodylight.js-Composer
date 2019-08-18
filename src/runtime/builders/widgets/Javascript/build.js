import configuration from './configuration'
import generateTemplate from '@runtime/builders/generateTemplate'

export default () => {
  const script = `const javascript = ${generateTemplate(configuration())}`
  const html = ''
  const css = ''

  return { script, html, css }
}

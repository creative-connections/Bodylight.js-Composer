import generateTemplate from '@runtime/builders/generateTemplate'
import initAnimates from './initAnimates'

export default () => {
  const script = generateTemplate(initAnimates)
  const html = ''
  const css = ''

  return { script, html, css }
}

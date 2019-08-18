import generateTemplate from '@runtime/builders/generateTemplate'
import initValueProviders from './initValueProviders'

export default () => {
  const script = generateTemplate(initValueProviders)
  const html = ''
  const css = ''

  return { script, html, css }
}

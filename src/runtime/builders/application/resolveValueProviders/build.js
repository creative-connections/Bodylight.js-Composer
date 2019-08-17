import generateTemplate from '@runtime/builders/generateTemplate'
import resolveValueProviders from './resolveValueProviders'

export default () => {
  const script = generateTemplate(resolveValueProviders)
  const html = ''
  const css = ''

  return { script, html, css }
}

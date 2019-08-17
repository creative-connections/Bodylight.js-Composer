import generateTemplate from '@runtime/builders/generateTemplate'
import init from './init'

export default () => {
  const script = `
    ${generateTemplate(init)}
    init()
  `
  const html = ''
  const css = ''

  return { script, html, css }
}

import generateTemplate from '@runtime/builders/generateTemplate'

import CSS from './template/css'
import HTML from './template/html'
import Spinner from './template/Spinner'

export default () => {
  const script = `
    ${generateTemplate(Spinner)}
    const spinner = new Spinner()
  `
  const html = HTML()
  const css = CSS()

  return { script, html, css }
}

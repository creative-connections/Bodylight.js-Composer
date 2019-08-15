import generateTemplate from '../generateTemplate'
import initAnimatePlays from './template/init'

export default () => {
  const script = generateTemplate(initAnimatePlays)
  const html = ''
  const css = ''

  return { script, html, css }
}

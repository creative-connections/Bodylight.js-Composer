import configuration from './configuration'

export default () => {
  const script = `
    const animates = {}
    ${configuration()}
  `
  const html = ''
  const css = ''

  return { script, html, css }
}

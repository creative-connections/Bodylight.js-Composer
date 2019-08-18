import animateFps from './animateFps'

export default () => {
  const script = `const animateFps = ${animateFps()}`
  const html = ''
  const css = ''

  return { script, html, css }
}

export default function html (output = true) {
  if (!output) {
    return ''
  }
  return `
    <div id="performance"></div>
    <div id="performance-btn"></div>
  `
}

export default function html (output = true) {
  if (!output) {
    return ''
  }
  return `
    <script src="https://unpkg.com/draggabilly@2/dist/draggabilly.pkgd.min.js"></script>
    <div id="performance">
      <header id="performance-header"><p>Performance</p></header>
      <div id="performance-content"></div>
    </div>
    <div id="performance-btn"></div>
  `
}

export default function html (enabled) {
  if (!enabled) { return '' }
  return `
    <script src="https://unpkg.com/draggabilly@2/dist/draggabilly.pkgd.min.js"></script>
    <div id="performance">
      <header id="performance-header"><p>Performance statistics</p></header>
      <div id="performance-content"></div>
    </div>
    <div id="performance-btn">Performance</div>
  `
}

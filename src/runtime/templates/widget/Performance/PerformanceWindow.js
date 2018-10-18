export default class PerformanceWindow {
  constructor () {
    this.render = this.render.bind(this)

    document.addEventListener('DOMContentLoaded', event => {
      this.button = document.getElementById('performance-btn')
      this.window = document.getElementById('performance')
      this.header = document.getElementById('performance-header')
      this.content = document.getElementById('performance-content')

      this.button.addEventListener('click', () => { this.buttonClick() })
    })

    this.visible = false
  }

  buttonClick () {
    this.visible = !this.visible
    this.visible ? this.show() : this.hide()
    this.render()
  }

  show () {
    this.window.style.display = 'block'
    this.draggie = new Draggabilly(this.window, {handle: '#performance-header'})

    this.renderinterval = window.setInterval(this.render, 800)
  }

  hide () {
    this.window.style.display = 'none'
    this.draggie.destroy()
    window.clearInterval(this.renderinterval)
  }

  render () {
    if (!this.visible) {
      return
    }
    const fps = createjs.Ticker.getMeasuredFPS()

    // FPS
    const root = document.createElement('div')
    root.appendChild(document.createTextNode(
      `Current: ${Math.round(1 / fps * 1000)}ms (${Number(fps).toPrecision(3)} fps)`
    ))

    const table = document.createElement('table')

    // Table of perf.measured
    Object.entries(perf.measured).forEach(([id, node]) => {
      if (Object.entries(node.measures).length === 0) {
        return
      }

      // Widget name
      const row = document.createElement('tr')
      const tdName = document.createElement('td')
      tdName.className = 'pwtd-name'
      tdName.appendChild(document.createTextNode(`${node.name} (${node.type})`))
      row.appendChild(tdName)
      table.appendChild(row)

      // Row per action
      Object.entries(node.measures).forEach(([id, measurement]) => {
        let duration = Math.round(measurement.duration)
        let unit = 'ms'
        if (duration < 2) {
          duration = Math.round(measurement.duration * 1000)
          unit = 'us'
        }

        // Measured action name
        const row = document.createElement('tr')
        const tdName = document.createElement('td')
        tdName.className = 'pwtd-action'
        tdName.appendChild(document.createTextNode(measurement.action))
        row.appendChild(tdName)

        // Measured action duration
        const tdMs = document.createElement('td')
        tdMs.className = 'pwtd-duration'
        tdMs.appendChild(document.createTextNode(`${duration} ${unit}`))
        row.appendChild(tdMs)

        table.appendChild(row)
      })
    })

    root.appendChild(table)

    while (this.content.firstChild) {
      this.content.removeChild(this.content.firstChild)
    }
    this.content.appendChild(root)
  }
}

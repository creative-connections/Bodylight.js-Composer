export default class Performance {
  constructor () {
    this.measured = {}
  }

  register (id, name, type) {
    const measures = {}
    this.measured[id] = {
      id, name, type, measures
    }
  }

  start (id, action) {
    performance.mark(`${id}-${action}-start`)
  }

  stop (id, action) {
    const name = `${id}-${action}`
    const start = `${id}-${action}-start`
    const stop = `${id}-${action}-stop`
    performance.mark(stop)

    performance.measure(name, start, stop)
    let measure = performance.getEntriesByName(name)[0]

    if (this.measured[id].measures[action]) {
      this.measured[id].measures[action] = (this.measured[id].measures[action] + measure.duration) / 2
    } else {
      this.measured[id].measures[action] = measure.duration
    }

    performance.clearMeasures(name)

    if (false) {
      let ms = this.measured[id].measures[action]
      let fps = 1 / (ms / 1000)
      console.log(id, action, ms, 'ms', fps, 'fps')
    }
  }
}

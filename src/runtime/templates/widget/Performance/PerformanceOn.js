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

  start (id, action, specifier = '') {
    performance.mark(`${id}-${action}-${specifier}-start`)
  }

  stop (id, action, specifier = '') {
    const name = `${id}-${action}-${specifier}`
    const start = `${id}-${action}-${specifier}-start`
    const stop = `${id}-${action}-${specifier}stop`
    const actionName = `${action}-${specifier}`
    performance.mark(stop)

    performance.measure(name, start, stop)
    let measure = performance.getEntriesByName(name)[0]

    if (this.measured[id].measures[actionName]) {
      this.measured[id].measures[actionName].duration = (
        this.measured[id].measures[actionName].duration + measure.duration) / 2
    } else {
      this.measured[id].measures[actionName] = {
        action,
        duration: measure.duration
      }
    }

    performance.clearMeasures(name)

    if (false) {
      let ms = this.measured[id].measures[actionName]
      let fps = 1 / (ms / 1000)
      console.log(id, actionName, ms, 'ms', fps, 'fps')
    }
  }
}

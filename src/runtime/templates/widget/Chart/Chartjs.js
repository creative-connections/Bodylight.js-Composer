class Widget { }

export default class Chartjs extends Widget {
  constructor (configuration) {
    super(configuration, 'chart')

    Object.entries(this.datasets).forEach(([id, dataset]) => {
      this.addValueProvider(JSON.stringify({dataset: id, axis: 'x'}), dataset.x.provider)
      this.addValueProvider(JSON.stringify({dataset: id, axis: 'y'}), dataset.y.provider)
      this.addValueProvider(JSON.stringify({dataset: id, type: 'maxSamples'}), dataset.maxSamples.provider)
    })
  }

  setValueProvider (attribute, id, target) {
  }

  generateSetters () {
    this.setters = {
      enabled: () => {
        if (this.enabled.function !== null) {
          this.enabled.value = this.enabled.function(this.enabled.value)
        }
      },
      maxSamples: (dataset) => {
        if (dataset) {
          if (this.datasets[dataset].maxSamples.function !== null) {
            this.datasets[dataset].maxSamples.value = this.datasets[dataset].maxSamples.function(this.datasets[dataset].maxSamples.value)
          }
        }
      }
    }
  }

  initChart () {
    if (this.chart) {
      return
    }

    this.canvas = document.createElement('canvas')
    this.component.appendChild(this.canvas)

    this.chart = new Chart(this.canvas, {
      type: 'line',
      data: {
        datasets: [{
          label: 'My First dataset',
          data: [1, 2, 5, 7, 60],
          fill: false
        }]
      }
    })
  }

  updateComponent () {
    super.updateComponent()
    this.initChart()
  }

  extendTrace (id, axis, value, time) {
  }

  updateTrace (id, axis, values, time) {
  }

  oneshotBufferUpdateTraces () {
  }

  setArray (attribute, array, time) {
    this.setValue(attribute, array, time)
  }

  setArrays (attribute, arrays, times) {
    // draw only the last array
    const array = arrays[arrays.length - 1]
    const time = times[times.length - 1]
    this.setValues(attribute, array, time)
  }

  setValues (attribute, values, time) {
  }

  setValue (attribute, value, time) {
  }

  parseAttribute (attribute) {
    if (attribute.startsWith('{')) {
      return JSON.parse(attribute)
    }
    return null
  }
}

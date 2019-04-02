class PlotlyBase {}

export default class PlotlyChart extends PlotlyBase {
  constructor(configuration) {
    super(configuration, 'chart')

    Object.entries(this.datasets).forEach(([id, dataset]) => {
      this.addValueProvider(JSON.stringify({ dataset: id, axis: 'x' }), dataset.x.provider)
      this.addValueProvider(JSON.stringify({ dataset: id, axis: 'y' }), dataset.y.provider)
      this.addValueProvider(
        JSON.stringify({ dataset: id, type: 'maxSamples' }),
        dataset.maxSamples.provider
      )
    })

    this.oneshotBufferUpdateTraces = this.oneshotBufferUpdateTraces.bind(this)

    this.tick = this.tick.bind(this)
    window.setInterval(this.tick, 1000/this.fps)
  }

  setValueProvider(attribute, id, target) {
    const attr = this.parseAttribute(attribute)

    if (attr && attr.dataset) {
      const dataset = this.datasets[attr.dataset]
      const axis = dataset[attr.axis]

      // in case of an array variable we need to register an array listener
      if (axis.array) {
        target.registerArrayListener(this, axis.indexes, attribute, true)
      } else {
        target.registerValueListener(this, id, attribute, true)
      }
    } else {
      super.setValueProvider(attribute, id, target)
    }
  }

  generateSetters() {
    this.setters = {
      enabled: () => {
        if (this.enabled.function !== null) {
          this.enabled.value = this.enabled.function(this.enabled.value)
        }
      },
      maxSamples: (dataset) => {
        if (dataset) {
          if (this.datasets[dataset].maxSamples.function !== null) {
            this.datasets[dataset].maxSamples.value = this.datasets[dataset].maxSamples.function(
              this.datasets[dataset].maxSamples.value
            )
          }
        }
      },
      offset: (dataset) => {
        if (dataset) {
          if (this.datasets[dataset].offset.function !== null) {
            this.datasets[dataset].offset.value = this.datasets[dataset].offset.function(
              this.datasets[dataset].offset.value
            )
          }
        }
      }
    }
  }

  initTraces() {
    this.indexes = {}
    const data = []
    let index = 0
    Object.entries(this.datasets).forEach(([id, dataset]) => {
      this.indexes[id] = index
      // create buffer for XY plots
      this.buffer[id] = { current: null, x: null, y: null }
      this.oneshotBuffer[id] = { x: null, y: null }
      data[index] = {
        x: [],
        y: [],
        type: 'scatter',
        mode: dataset.mode,
        name: dataset.name,
        line: dataset.line,
        fill: dataset.fill,
        showlegend: dataset.showlegend
      }
      // rest of the configuration options
      Object.entries(dataset.other).forEach(([key, value]) => {
        data[index][key] = value
      })
      index++
    })
    return data
  }

  initPlotly() {
    if (this.plotly === null || this.plotly === undefined) {
      const d3 = Plotly.d3

      var div = d3.select(this.component).style({ width: '100%', height: '100%' })
      this.plotly = div.node()

      this.buffer = {}
      this.oneshotBuffer = {}
      this.oneshotBufferUpdateTracesTimeout = false

      const data = this.initTraces()
      const shapes = this.initShapes()
      const annotations = this.initAnnotations()
      const images = this.initImages()

      const layout = {
        xaxis: this.xaxis,
        yaxis: this.yaxis,
        margin: this.margin,
        legend: this.legend,

        plot_bgcolor: this.plot_bgcolor,
        paper_bgcolor: this.paper_bgcolor,

        shapes,
        annotations,
        images
      }
      const config = {
        'displayModeBar': false,
        'responsive': true
      }

      Plotly.newPlot(this.plotly, data, layout, config)
      Plotly.Plots.resize(this.plotly)
      this.initialized = true
    }
  }


  updateTrace(id, axis, values, time) {
    if (this.enabled.value === false) {
      return
    }
    const altAxis = axis === 'x' ? 'y' : 'x'

    if (this.datasets[id][altAxis].time) {
      const update = { y: time, x: time }
      update[axis] = values
      this.oneshotBuffer[id] = update
    } else {
      this.oneshotBuffer[id][axis] = values
    }
    if (this.oneshotBufferUpdateTracesTimeout === false) {
      this.oneshotBufferUpdateTracesTimeout = window.setTimeout(this.oneshotBufferUpdateTraces, 50)
    }
  }

  oneshotBufferUpdateTraces() {
    this.perf.start(this.id, 'updateTrace')
    const buf = this.oneshotBuffer
    const tracesToUpdate = []
    const update = { x: [], y: [] }

    Object.entries(buf).forEach(([id, data]) => {
      const index = this.indexes[id]
      if (data.x === null || data.y === null) { return }

      const maxSamples = Number(this.datasets[id].maxSamples.value)
      const length = data.x.length
      if (maxSamples > 0 && length > maxSamples) {
        data.x = data.x.slice(length - maxSamples)
        data.y = data.y.slice(length - maxSamples)
      }

      tracesToUpdate.push(index)
      update.x.push(data.x)
      update.y.push(data.y)
      this.oneshotBuffer[id].x = null
      this.oneshotBuffer[id].y = null
    })

    Plotly.restyle(this.plotly, update, tracesToUpdate)
    this.oneshotBufferUpdateTracesTimeout = false

    this.dispatchEvent(new Event('change'))

    this.perf.stop(this.id, 'updateTrace')
  }

  offsetArrayTime(attribute, array, time) {
    const attr = JSON.parse(attribute)
    if (Array.isArray(time) === false) {
      time = [...Array(array.length).keys()]
    }

    const dataset = this.datasets[attr.dataset]
    if (dataset.offset != null && dataset.offset.value > 0) {
      time = time.map(val => parseFloat(val) + parseFloat(dataset.offset.value))
    }

    return time
  }

  setArray(attribute, array, time) {
    time = this.offsetArrayTime(attribute, array, time)
    this.setValue(attribute, array, time)
  }

  setArrays(attribute, arrays, times) {
    // draw only the last array
    const array = arrays[arrays.length - 1]
    const time = this.offsetArrayTime(attribute, array, times[times.length - 1])
    this.setValues(attribute, array, time)
  }

  clear() {
    this.plotly = null
    this.initPlotly()
  }

  getIdFromIndex(index) {
    let id = null
    Object.entries(this.indexes).forEach((entry) => {
      if (entry[1] === index) {
        id = entry[0]
      }
    })
    return id
  }

  clearBuffer(id) {
    this.buffer[id] = { current: null, x: null, y: null }
    this.oneshotBuffer[id] = { x: null, y: null }
  }

  clearTrace(index) {
    const id = this.getIdFromIndex(index)
    if (id != null) {
      this.clearBuffer(id)
    }
    Plotly.restyle(this.plotly, {x:[[]], y:[[]]}, [index])
  }

  deleteTrace(index) {
    Plotly.deleteTraces(this.plotly, index)
  }

  setValues(attribute, values, time) {
    const lastValue = values[values.length - 1]

    if (attribute.startsWith('{')) {
      const attr = JSON.parse(attribute)
      if (attr.axis) {
        if (this.datasets[attr.dataset][attr.axis].function !== null) {
          let transformed = []
          values.forEach(value => {
            transformed.push(this.datasets[attr.dataset][attr.axis].function(value))
          })
          this.updateTrace(attr.dataset, attr.axis, transformed, time)
        } else {
          this.updateTrace(attr.dataset, attr.axis, values, time)
        }
        return
      }
      // attribute is a dataset configuration option
      if (attr.dataset) {
        this.datasets[attr.dataset][attr.type].value = lastValue
        this.setters[attr.type](attr.dataset)
        return
      }
      // attribute is item
      if (attr.identifier) {
        this[attr.identifier][attr.id][attr.name].value = lastValue
        this.setters[attr.setter](attr.id)
      }
    }
  }

  setValue(attribute, value, time) {
    if (attribute.startsWith('{')) {
      const attr = JSON.parse(attribute)
      // attribute is time series
      if (attr.axis) {
        if (this.datasets[attr.dataset][attr.axis].function !== null) {
          value = this.datasets[attr.dataset][attr.axis].function(value)
        }
        if (this.enabled.value) {
          if (!Array.isArray(value)) {
            this.appendToDataset(attr.dataset, attr.axis, value, time)
          } else {
            this.replaceDataset(attr.dataset, attr.axis, value, time)
          }
        }
        return
      }
      // attribute is a dataset configuration option
      if (attr.dataset) {
        this.datasets[attr.dataset][attr.type].value = value
        this.setters[attr.type](attr.dataset)
        return
      }
      // attribute is shape
      if (attr.identifier) {
        this[attr.identifier][attr.id][attr.name].value = value
        this.setters[attr.setter](attr.id)
        return
      }
    }
    super.setValue(attribute, value, time)
  }

  appendToDataset(id, axis, value, time) {
    const altAxis = axis === 'x' ? 'y' : 'x'
    const buffer = this.buffer

    if (this.datasets[id][altAxis].time) {
      /*
       * When plotting axis vs. time, we already have
       * all the necessary information (axis and time).
       */
      buffer[id][axis] ? buffer[id][axis].push(value) : buffer[id][axis] = [value]
      buffer[id][altAxis] ? buffer[id][altAxis].push(time) : buffer[id][altAxis] = [time]
    } else {
      /*
       * When plotting axis vs. axis, we need to wait for the other axis to
       * be set, this usually happens during the same update cycle. Therefore
       * we set the buffer[id][axis].current variable with the currently
       * available information (the value).
       *
       * It is possible to lose data points here, in the case that one of the axis
       * updates faster than the other one, in that case we emit a warning and discard
       * the previous variable. Synchronizing inputs is out of scope for this Widget.
       */
      if (buffer[id].current == null) { buffer[id].current = {x: null, y: null} }

      const current = buffer[id].current
      if (current[axis] != null) {
        console.warn(
          `Discarding ${axis} data point id:${id} value:${value} for time:${time}. ` +
          'This usually happens when one of the axes of the XY chart is updating faster ' +
          'than the other one. Chart is now probably in an inconsistent state.`'
        )
      }

      current[axis] = value

      if (current[axis] != null && current[altAxis] != null) {
        if (buffer[id][axis] == null) { buffer[id][axis] = [] }
        if (buffer[id][altAxis] == null) { buffer[id][altAxis] = [] }

        buffer[id][axis].push(current[axis])
        buffer[id][altAxis].push(current[altAxis])

        buffer[id].current = null
      }
    }
  }

  replaceDataset(id, axis, values, time) {
    const altAxis = axis === 'x' ? 'y' : 'x'
    const buffer = this.buffer

    if (this.datasets[id][altAxis].time) {
      buffer[id][axis] = this.truncateDatapoints(id, values)
      buffer[id][altAxis] = this.truncateDatapoints(id, time)
      buffer[id].replace = true
    } else {
      if (buffer[id].current == null) { buffer[id].current = {x: null, y: null} }

      const current = buffer[id].current

      if (current[axis] != null) {
        console.warn(
          `Discarding ${axis} data points id:${id} values:${values} for time:${time}. ` +
          'This usually happens when one of the axes of the XY chart is updating faster ' +
          'than the other one. Chart is now probably in an inconsistent state.`'
        )
      }

      current[axis] = values

      if (current[axis] != null && current[altAxis] != null) {
        if (buffer[id][axis] == null) { buffer[id][axis] = [] }
        if (buffer[id][altAxis] == null) { buffer[id][altAxis] = [] }

        buffer[id][axis] = current[axis]
        buffer[id][altAxis] = current[altAxis]
        buffer[id].current = null
        buffer[id].replace = true
      }
    }
  }

  truncateDatapoints(id, values) {
    const maxSamples = Number(this.datasets[id].maxSamples.value)
    const length = values.length
    if (maxSamples > 0 && length > maxSamples) {
      return values.slice(length - maxSamples)
    }
    return values
  }


  tick () {
    this.perf.start(this.id, 'tick')
    this.flushBuffer()
    this.perf.stop(this.id, 'tick')
  }

  flushBuffer () {
    const extend = { x: [], y: [] }
    const replace = { x: [], y: [] }
    const indexes =  {extend: [], replace: []}
    const maxSamples = { x: [], y: [] }

    Object.entries(this.buffer).forEach(([id, buffer]) => {
      if (buffer.x && buffer.y) {
        if (buffer.replace) {
          replace.x.push(buffer.x)
          replace.y.push(buffer.y)
          indexes.replace.push(this.indexes[id])
        } else {
          extend.x.push(buffer.x)
          extend.y.push(buffer.y)
          indexes.extend.push(this.indexes[id])
          maxSamples.x.push(this.datasets[id].maxSamples.value)
          maxSamples.y.push(this.datasets[id].maxSamples.value)
        }
        this.buffer[id] = { current: null, x: null, y: null }
      }
    })

    if (indexes.extend.length > 0) {
      Plotly.extendTraces(this.plotly, { x: extend.x, y: extend.y}, indexes.extend, maxSamples)
    }

    if (indexes.replace.length > 0) {
      Plotly.restyle(this.plotly, replace, indexes.replace)
    }
  }

  snapshot(id, changeColor = true) {
    if (this.plotly.data[id] == null) {
      return
    }

    const trace = this.plotly.data[id]
    const duplicate = Object.assign({}, trace)
    if (changeColor) {
      duplicate.line = Object.assign({}, trace.line)
      duplicate.line.color = null
    }
    Plotly.addTraces(this.plotly, [
      duplicate
    ])
  }
}

class Widget {}

export default class PlotlyChart extends Widget {
  constructor(configuration) {
    super(configuration, 'chart')

    Object.entries(this.datasets).forEach(([id, dataset]) => {
      this.addValueProvider(JSON.stringify({ dataset: id, axis: 'x' }), dataset.x.provider)
      this.addValueProvider(JSON.stringify({ dataset: id, axis: 'y' }), dataset.y.provider)
      this.addValueProvider(JSON.stringify({ dataset: id, type: 'maxSamples' }), dataset.maxSamples.provider)
    })

    this.initShapes()

    this.oneshotBufferUpdateTraces = this.oneshotBufferUpdateTraces.bind(this)
  }

  initShapes() {
    const shapes = Object.values(this.shapes)
    if (shapes.length === 0) { return }

    const complex = []
    Object.entries(shapes[0]).forEach(([key, value]) => {
      if (typeof value['complex'] !== 'undefined' && value['complex']) {
        complex.push(key)
      }
    })

    // create setter for each complex attribute
    complex.forEach(name => {
      this.setters[`shape-${name}`] = (shape) => {
        if (shape == null) { return }

        const attr = this.shapes[shape][name]
        if (attr.function !== null) {
          attr.value = attr.function(attr.value)
        }

        const shapeIdentifier = `shapes[${this.shapeIndexes[shape]}].${name}`
        Plotly.relayout(this.plotly, {
          [shapeIdentifier]: attr.value
        })
      }
    })

    // register provider
    Object.entries(this.shapes).forEach(([id, shape]) => {
      complex.forEach(name => {
        if (shape[name].provider) {
          this.addValueProvider(JSON.stringify({ shape: id, setter: `shape-${name}`, name }), shape[name].provider)
        }
      })
    })
  }

  initAnnotations() {

  }

  setValueProvider(attribute, id, target) {
    const attr = this.parseAttribute(attribute)

    if (attr && attr.dataset) {
      const dataset = this.datasets[attr.dataset]
      const axis = dataset[attr.axis]

      // in case of an array variable we need to register an array listener
      if (axis.array) {
        target.registerArrayListener(this, axis.indexes, attribute)
      } else {
        target.registerValueListener(this, id, attribute)
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
            this.datasets[dataset].maxSamples.value = this.datasets[dataset].maxSamples.function(this.datasets[dataset].maxSamples.value)
          }
        }
      }
    }
  }

  initPlotly() {
    if (this.plotly === null || this.plotly === undefined) {
      const d3 = Plotly.d3

      var div = d3.select(this.component)
        .append('div')
        .style({
          width: '100%',
          height: '100%'
        })

      this.plotly = div.node()

      this.indexes = []
      this.buffer = {}
      this.oneshotBuffer = {}
      this.oneshotBufferUpdateTracesTimeout = false
      const data = []
      let index = 0
      Object.entries(this.datasets).forEach(([id, dataset]) => {
        this.indexes[id] = index
        // create buffer for XY plots
        this.buffer[id] = { x: null, y: null }
        this.oneshotBuffer[id] = { x: null, y: null }
        data[index] = {
          x: [],
          y: [],
          type: 'scatter',
          mode: dataset.mode,
          name: dataset.name,
          line: dataset.line,
          fill: dataset.fill,
        }
        // rest of the configuration options
        Object.entries(dataset.other).forEach(([key, value]) => {
          data[index][key] = value
        })
        index++
      })

      this.shapeIndexes = []
      const shapes = []
      index = 1
      Object.entries(this.shapes).forEach(([id, shape]) => {
        this.shapeIndexes[id] = index

        shapes[index] = {
          type: shape.type,
          name: shape.name,
          xref: shape.xref,
          yref: shape.yref,
          layer: shape.layer,
          x0: shape.x0.value,
          x1: shape.x1.value,
          y0: shape.y0.value,
          y1: shape.y1.value,
          visible: shape.visible.value,
          opacity: shape.opacity.value,
          fillcolor: shape.fillcolor.value,
          line: {
            color: shape.color.value,
            width: shape.width.value,
            dash: shape.dash.value
          },
        }
        index++
      })

      const layout = {
        xaxis: this.xaxis,
        yaxis: this.yaxis,
        margin: {
          l: 50,
          r: 20,
          b: 20,
          t: 20,
          pad: 4
        },
        shapes: shapes
      }
      const config = {
        'displayModeBar': false
      }

      Plotly.newPlot(this.plotly, data, layout, config)
      Plotly.Plots.resize(this.plotly)
      this.initialized = true
    }
  }

  updateComponent() {
    super.updateComponent()
    this.initPlotly()
    Plotly.Plots.resize(this.plotly)
  }

  extendTrace(id, axis, value, time) {
    this.perf.start(this.id, 'extendTrace', id)
    if (this.enabled.value === false) {
      return
    }
    const index = this.indexes[id]
    const altAxis = axis === 'x' ? 'y' : 'x'
    if (this.datasets[id][altAxis].time) {
      if (!Array.isArray(value)) {
        // plotting axis vs time - append value to the end
        const extend = { y: [[time]], x: [[time]] }
        extend[axis] = [[value]]
        Plotly.extendTraces(this.plotly, extend, [index], this.datasets[id].maxSamples.value)
      } else {
        // plotting array vs indicies - treating this as a oneshot update
        // create indicies [0,1,2,...,length]
        const indicies = Array.from({ length: value.length }, (v, k) => k++)
        // replace previous trace for id/axis
        this.updateTrace(id, axis, value, indicies)
      }
    } else {
      // for a XY plot, we need to save the current value until we have both axes
      if (!Array.isArray(value)) {
        // plotting X,Y values
        this.buffer[id][axis] = [[value]]

        // if we have both of them then we flush
        if (this.buffer[id][altAxis] !== null) {
          Plotly.extendTraces(this.plotly, this.buffer[id], [index], this.datasets[id].maxSamples.value)
          this.buffer[id].x = null
          this.buffer[id].y = null
        }
      } else {
        // plotting [X],[Y] arrays
        this.buffer[id][axis] = value

        // if we have both of them then we flush
        if (this.buffer[id][altAxis] !== null) {
          this.updateTrace(id, 'x', this.buffer[id].x, null)
          this.updateTrace(id, 'y', this.buffer[id].y, null)
          this.buffer[id].x = null
          this.buffer[id].y = null
        }
      }
    }
    this.perf.stop(this.id, 'extendTrace', id)
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
      if (data.x === null || data.y === null) {
        return
      }
      tracesToUpdate.push(index)
      update.x.push(data.x)
      update.y.push(data.y)
      this.oneshotBuffer[id].x = null
      this.oneshotBuffer[id].y = null
    })

    Plotly.restyle(this.plotly, update, tracesToUpdate)
    this.oneshotBufferUpdateTracesTimeout = false
    this.perf.stop(this.id, 'updateTrace')
  }

  setArray(attribute, array, time) {
    this.setValue(attribute, array, time)
  }

  setArrays(attribute, arrays, times) {
    // draw only the last array
    const array = arrays[arrays.length - 1]
    const time = times[times.length - 1]
    this.setValues(attribute, array, time)
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
      // attribute is shape
      if (attr.shape) {
        this.shapes[attr.shape][attr.name].value = lastValue
        this.setters[attr.setter](attr.shape)
      }
    }
  }

  setValue(attribute, value, time) {
    // when we have an JSON encoded attribute specifier
    if (attribute.startsWith('{')) {
      const attr = JSON.parse(attribute)
      // attribute is time series
      if (attr.axis) {
        if (this.datasets[attr.dataset][attr.axis].function !== null) {
          value = this.datasets[attr.dataset][attr.axis].function(value)
        }
        this.extendTrace(attr.dataset, attr.axis, value, time)
        return
      }
      // attribute is a dataset configuration option
      if (attr.dataset) {
        this.datasets[attr.dataset][attr.type].value = value
        this.setters[attr.type](attr.dataset)
        return
      }
      // attribute is shape
      if (attr.shape) {
        this.shapes[attr.shape][attr.name].value = value
        this.setters[attr.setter](attr.shape)
        return
      }
    }

    super.setValue(attribute, value, time)
  }

  parseAttribute(attribute) {
    if (attribute.startsWith('{')) {
      return JSON.parse(attribute)
    }
    return null
  }
}
class Widget {}

export default class PlotlyChart extends Widget {
  constructor(configuration) {
    super(configuration, 'chart')

    Object.entries(this.datasets).forEach(([id, dataset]) => {
      this.addValueProvider(JSON.stringify({ dataset: id, axis: 'x' }), dataset.x.provider)
      this.addValueProvider(JSON.stringify({ dataset: id, axis: 'y' }), dataset.y.provider)
      this.addValueProvider(JSON.stringify({ dataset: id, type: 'maxSamples' }), dataset.maxSamples.provider)
    })

    this.initAdditionals('shapes', this.shapes, this.shapeIndexes)
    this.initAdditionals('annotations', this.annotations, this.annotationIndexes)
    this.initAdditionals('images', this.images, this.imageIndexes)


    this.oneshotBufferUpdateTraces = this.oneshotBufferUpdateTraces.bind(this)
  }

  // Initializes setters for shapes, annotations, etc.
  initAdditionals(identifier, config, indexes) {
    if (config == null) { return }
    const items = Object.values(config)
    if (items.length === 0) { return }

    const complex = []
    Object.entries(items[0]).forEach(([key, value]) => {
      if (typeof value['complex'] !== 'undefined' && value['complex']) {
        complex.push(key)
      }
    })

    // create setter for each complex attribute
    complex.forEach(name => {
      this.setters[`${identifier}-${name}`] = (item) => {
        if (item == null) { return }

        const attr = config[item][name]
        if (attr.function !== null) {
          attr.value = attr.function(attr.value)
        }

        const itemIdentifier = `${identifier}[${indexes[item]}].${name}`
        Plotly.relayout(this.plotly, {
          [itemIdentifier]: attr.value
        })
      }
    })

    // register provider
    Object.entries(config).forEach(([id, item]) => {
      complex.forEach(name => {
        if (item[name].provider) {
          this.addValueProvider(JSON.stringify({
            identifier,
            id,
            setter: `${identifier}-${name}`,
            name
          }), item[name].provider)
        }
      })
    })
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
      },
      offset: (dataset) => {
        if (dataset) {
          if (this.datasets[dataset].offset.function !== null) {
            this.datasets[dataset].offset.value = this.datasets[dataset].offset.function(this.datasets[dataset].offset.value)
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

      this.shapes = this.shapes || {}
      this.annotations = this.annotations || {}
      this.images = this.images || {}

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

      this.annotationIndexes = []
      const annotations = []
      index = 1
      Object.entries(this.annotations).forEach(([id, annotation]) => {
        this.annotationIndexes[id] = index

        annotations[index] = {
          xref: annotation.xref,
          yref: annotation.yref,
          x: annotation.x.value,
          y: annotation.y.value,
          visible: annotation.visible.value,
          opacity: annotation.opacity.value,
          font: {
            family: annotation.family.value,
            size: annotation.size.value,
            color: annotation.color.value,
          },
          bgcolor: annotation.bgcolor.value,
          bordercolor: annotation.bordercolor.value,
          width: annotation.width.value,
          height: annotation.height.value,
          text: annotation.text.value,
          showarrow: false
        }
        index++
      })

      this.imageIndexes = []
      const images = []
      index = 1
      Object.entries(this.images).forEach(([id, image]) => {
        this.imageIndexes[id] = index
        images[index] = {
          name: image.name,
          source: image.source,
          xref: image.xref,
          yref: image.yref,
          sizing: image.sizing,
          x: image.x.value,
          y: image.y.value,
          sizex: image.sizex.value,
          sizey: image.sizey.value,
          visible: image.visible.value,
          opacity: image.opacity.value,
          layer: image.layer,
          xanchor: image.xanchor,
          yanchor: image.yanchor
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
        shapes,
        annotations,
        images
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
      if (data.x === null || data.y === null) { return }

      const maxSamples = Number(this.datasets[id].maxSamples.value)
      if (maxSamples > 0) {
        data.x.splice(maxSamples)
        data.y.splice(maxSamples)
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
      if (attr.identifier) {
        this[attr.identifier][attr.id][attr.name].value = value
        this.setters[attr.setter](attr.id)
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
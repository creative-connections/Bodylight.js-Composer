class Widget { }

export default class PlotlyChart extends Widget {
  constructor (configuration) {
    super(configuration, 'chart')

    Object.entries(this.datasets).forEach(([id, dataset]) => {
      this.addValueProvider(JSON.stringify({dataset: id, axis: 'x'}), dataset.x.provider)
      this.addValueProvider(JSON.stringify({dataset: id, axis: 'y'}), dataset.y.provider)
      this.addValueProvider(JSON.stringify({dataset: id, type: 'maxSamples'}), dataset.maxSamples.provider)
    })
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

  initPlotly () {
    if (this.plotly === null || this.plotly === undefined) {
      const d3 = Plotly.d3

      var div = d3.select(this.component)
        .append('div')
        .style({
          width: '100%',
          height: '100%'
        })

      this.plotly = div.node()

      const data = []
      this.indexes = []
      this.buffer = {}
      let index = 0
      Object.entries(this.datasets).forEach(([id, dataset]) => {
        this.indexes[id] = index
        this.buffer[id] = {x: null, y: null}
        data[index] = {
          x: [],
          y: [],
          type: 'scatter',
          mode: dataset.mode,
          name: dataset.name,
          line: dataset.line
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
        }
        /*
        shapes: [
          {
            type: 'line',
            xref: 'paper',
            yref: 'paper',
            x0: 0,
            y0: ln,
            x1: 1,
            y1: ln,
            line: {
              color: 'rgb(50, 171, 96)',
              width: 3
            }
          }, {
            type: 'line',
            xref: 'paper',
            yref: 'paper',
            x0: ln + 20,
            y0: 0,
            x1: ln + 20,
            y1: 1,
            line: {
              color: 'rgb(50, 171, 96)',
              width: 3
            }
          }
        ]
          */
      }
      const config = {
        'displayModeBar': false
      }

      Plotly.newPlot(this.plotly, data, layout, config)
      Plotly.Plots.resize(this.plotly)
    }
  }

  updateComponent () {
    super.updateComponent()
    this.initPlotly()
    Plotly.Plots.resize(this.plotly)
  }

  extendTrace (id, axis, value, time) {
    if (this.enabled.value === false) {
      return
    }
    const index = this.indexes[id]
    const altAxis = axis === 'x' ? 'y' : 'x'
    if (this.datasets[id][altAxis].time) {
      const extend = {
        y: [[time]],
        x: [[time]]
      }
      extend[axis] = [[value]]

      Plotly.extendTraces(this.plotly, extend, [index], this.datasets[id].maxSamples.value)
    } else {
      this.buffer[id][axis] = [[value]]

      if (this.buffer[id][altAxis] !== null) {
        Plotly.extendTraces(this.plotly, this.buffer[id], [index], this.datasets[id].maxSamples.value)
        this.buffer[id].x = null
        this.buffer[id].y = null
      }
    }
  }

  setValue (attribute, value, time) {
    // when we have an JSON encoded attribute specifier
    if (attribute.startsWith('{')) {
      const attr = JSON.parse(attribute)
      if (attr.axis) {
        if (this.datasets[attr.dataset][attr.axis].function !== null) {
          const transformed = this.datasets[attr.dataset][attr.axis].function(value)
          this.extendTrace(attr.dataset, attr.axis, transformed, time)
        } else {
          this.extendTrace(attr.dataset, attr.axis, value, time)
        }
        return
      }

      this.datasets[attr.dataset][attr.type].value = value
      this.setters[attr.type](attr.dataset)
      return
    }

    super.setValue(attribute, value, time)
  }
}

export default function initCharts() {
  return new Promise(resolve => {
    const charts = config.widgets.charts

    Object.entries(charts).forEach(([name, configuration]) => {
      let chart
      try {
        switch (configuration.library) {
        case 'plotly':
          chart = new PlotlyChart(configuration)
          break
        case 'gamblegram':
          chart = new Gamblegram(configuration)
          break
        }
      } catch (e) {
        if (e instanceof ReferenceError) {
          console.warn(e.message)
          return
        } else {
          throw e
        }
      }
      widgets[chart.id] = chart
    })
    resolve()
  })
}
export default function initCharts () {
  return new Promise(resolve => {
    const charts = config.widgets.charts

    Object.entries(charts).forEach(([name, configuration]) => {
      let chart
      try {
        if (configuration.library === 'plotly') {
          chart = new PlotlyChart(configuration)
        } else if (configuration.library === 'chartjs') {
          chart = new Chartjs(configuration)
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

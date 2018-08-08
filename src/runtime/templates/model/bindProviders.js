export default function bindProviders () {
  Object.entries(this.config.widgets.controlledAnimateAnim).forEach(
    ([key, value]) => {
      value.valueProvider = value.valueProvider.bind(this)()
    }
  )
  Object.entries(this.config.widgets.AnimateText).forEach(
    ([key, value]) => {
      value.valueProvider = value.valueProvider.bind(this)()
    }
  )
}

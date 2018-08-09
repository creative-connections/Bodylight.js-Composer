export default function bindWidgets () {
  const bindWidget = (key, value) => {
    try {
      value.widget = value.widget.bind(this)()
      return true
    } catch (e) {
      // FIXME: this should provide a concrete error in lookupWidget
      console.warn(`Could not find widget for ${value}! Message: ${e.message}`)
      return false
    }
  }

  Object.entries(this.config.widgets.controlledAnimateAnim).forEach(
    ([key, value]) => {
      if (!bindWidget(key, value)) {
        delete this.config.widgets.controlledAnimateAnim[key]
      }
    }
  )

  Object.entries(this.config.widgets.AnimateText).forEach(
    ([key, value]) => {
      if (!bindWidget(key, value)) {
        delete this.config.widgets.AnimateText[key]
      }
    }
  )
}

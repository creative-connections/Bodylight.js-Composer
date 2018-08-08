export default function bindWidgets () {
  Object.entries(this.config.widgets.controlledAnimateAnim).forEach(
    ([key, value]) => {
      value.widget = value.widget.bind(this)()
    }
  )
}

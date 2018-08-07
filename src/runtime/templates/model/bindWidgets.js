export default function bindWidgets () {
  Object.entries(this.config.widgets.controlledAnimateAnims).forEach(
    ([key, value]) => {
      value.widget = value.widget.bind(this)()
    }
  )
}

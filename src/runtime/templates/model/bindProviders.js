export default function bindProviders () {
  Object.entries(this.config.widgets.controlledAnimateAnims).forEach(
    ([key, value]) => {
      value.valueProvider = value.valueProvider.bind(this)()
    }
  )
}

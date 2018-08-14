export default class AnimateText {
  constructor (name, configuration, animate) {
    this.name = name
    this.component = animate.components.text[name]
    Object.assign(this, configuration)
  }

  getValueProvider () {
    return this.valueProvider
  }

  setValueProvider (provider, id) {
    provider.registerValueListener(this, id)
  }

  setValue (identifier, value) {
    this.component.text = this.transform(value)
    this.component.visible = this.visible(value)
  }
}

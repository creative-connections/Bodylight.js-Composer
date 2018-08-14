export default class AnimateAnim {
  constructor (name, configuration, animate) {
    this.name = name
    this.component = animate.components.anim[name]
    Object.assign(this, configuration)
  }

  getValueProvider () {
    return this.valueProvider
  }

  setValueProvider (provider, id) {
    provider.registerValueListener(this, id)
    this.valueProvider = provider
  }

  setValue (identifier, value) {
    value = this.transform(value)

    if (value < this.min) {
      this.overflow ? this.min = value : value = this.min
    }
    if (value > this.max) {
      this.overflow ? this.max = value : value = this.max
    }

    value = Math.floor((value - this.min) / (this.max - this.min) * 99)

    if (this.reverse) {
      value = 99 - value
    }

    this.component.gotoAndStop(value)
  }
}

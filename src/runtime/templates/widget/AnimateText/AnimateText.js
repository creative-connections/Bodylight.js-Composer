export default class AnimateText {
  constructor (name, configuration, animate) {
    this.name = name
    Object.assign(this, configuration)
    // console.log(animate)
  }

  getValueProvider () {
    return this.valueProvider
  }

  setValueProvider (provider, id) {
  }
}

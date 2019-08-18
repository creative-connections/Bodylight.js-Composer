class Widget {}

export default class AnimateText extends Widget {
  constructor (configuration) {
    super(configuration, 'AnimateText')
  }

  generateSetters () {
    this.setters = {
      value: () => {
        if (this.value.function === null) {
          this.component.text = this.value.value
        } else {
          this.component.text = this.value.function(this.value.value)
        }
      },
      visible: () => {
        if (this.visible.function === null) {
          this.component.visible = this.visible.value
        } else {
          this.component.visible = this.visible.function(this.visible.value)
        }
      }
    }
  }

  locateComponent () {
    if (typeof this.animate === 'function') {
      throw new ReferenceError(
        `Widget (${this.name}) of type (${this.typeIdentifier}) with ` +
        `name="${this.name}" could not be initialised because the relevant ` +
        `Animate is not loaded.`)
    }
    return this.animate.components.text[this.name]
  }
}

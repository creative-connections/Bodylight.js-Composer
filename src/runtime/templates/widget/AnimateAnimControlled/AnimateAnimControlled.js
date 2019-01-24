class Widget {}

export default class AnimateAnimControlled extends Widget {
  constructor (configuration) {
    super(configuration, 'AnimateAnimControlled')

    // duration: 100 -> 0 - 99
    this.framecount = this.component.timeline.duration - 1
    this.originalAlpha = this.component.alpha
  }

  generateSetters () {
    this.setters = {
      value: () => {
        let value = this.value.value
        if (this.value.function !== null) {
          value = this.value.function(this.value.value)
        }

        if (value < this.min.value) {
          if (this.overflow.value === false) {
            value = this.min.value
          } else {
            this.setValue('min', value)
          }
        }

        if (value > this.max.value) {
          if (this.overflow.value === false) {
            value = this.max.value
          } else {
            this.setValue('max', value)
          }
        }

        value = Math.floor(
          (value - this.min.value) /
          (this.max.value - this.min.value) * this.framecount
        )

        if (this.reversed.value === true) {
          value = this.framecount - value
        }

        this.component.gotoAndStop(value)
      },
      min: () => {
        if (this.min.function !== null) {
          this.min.value = this.min.function(this.min.value)
        }
      },
      max: () => {
        if (this.max.function !== null) {
          this.max.value = this.max.function(this.max.value)
        }
      },
      reversed: () => {
        if (this.reversed.function !== null) {
          this.reversed.value = this.reversed.function(this.reversed.value)
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
    return this.animate.components.anim[this.name]
  }

  blink (up = 0.08, down = 0.08) {
    const component = this.component

    if (component.alpha > 1) {
      this.blinkDirection = 0
    } else if (component.alpha < 0.4) {
      this.blinkDirection = 1
    }
    if (this.blinkDirection) {
      component.alpha = component.alpha + up
    } else {
      component.alpha = component.alpha - down
    }
  }

  stopBlinking () {
    this.component.alpha = this.originalAlpha
    this.blinkDirection = 0
  }
}

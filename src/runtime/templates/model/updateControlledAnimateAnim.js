export default function updateControlledAnimateAnim () {
  this.config.widgets.controlledAnimateAnim.forEach(anim => {
    let value = anim.transform(anim.valueProvider())

    if (value < anim.min) {
      anim.overflow ? anim.min = value : value = anim.min
    }
    if (value > anim.max) {
      anim.overflow ? anim.max = value : value = anim.max
    }

    value = Math.floor((value - anim.min) / (anim.max - anim.min) * 99)

    if (anim.reverse) {
      value = 99 - value
    }

    anim.widget.gotoAndStop(value)
  })
}

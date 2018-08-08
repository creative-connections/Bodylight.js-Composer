export default function updateAnimateText () {
  this.config.widgets.AnimateText.forEach(animateText => {
    let value = animateText.valueProvider()
    animateText.widget.text = animateText.transform(value)
    animateText.widget.visible = animateText.visible(value)
  })
}

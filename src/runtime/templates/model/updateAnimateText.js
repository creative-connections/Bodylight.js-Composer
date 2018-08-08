export default function updateAnimateText () {
  this.config.widgets.AnimateText.forEach(animateText => {
    let value = animateText.transform(animateText.valueProvider())
    animateText.widget.text = value
  })
}

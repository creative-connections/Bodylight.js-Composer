export default function stageTick () {
  this.updateOutputValues()

  this.updateControlledAnimateAnim()
  this.updateAnimateText()

  // model.updateVariables(values)
  // model.updateAnims(values)
  // model.tickAnimations(values)
}

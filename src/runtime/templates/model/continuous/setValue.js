export default function setValue (reference, value) {
  this.setSingleReal(reference, value)
  this.lastInputValues[reference] = value

  // update other value setters for the same reference, to synchronise controls
  this.valueSetters.forEach(item => {
    if (item.reference !== reference) {
      return
    }
    item.setter.setValue(
      item.attribute,
      value,
      this.currentStep
    )
  })
}

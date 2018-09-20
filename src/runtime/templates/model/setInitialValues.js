export default function setInitialValues () {
  for (const [reference, value] of Object.entries(this.initialValues)) {
    // don't set if we have a pending lastInputValue
    if (this.lastInputValues[reference] === undefined) {
      this.setSingleReal(reference, value)
    }
  }

  // after reset we might want to fill the previously configured values
  for (const [reference, value] of Object.entries(this.lastInputValues)) {
    this.setSingleReal(reference, value)
  }
}

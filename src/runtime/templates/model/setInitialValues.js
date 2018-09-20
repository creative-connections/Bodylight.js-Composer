export default function setInitialValues () {
  for (const [reference, value] of Object.entries(this.initialValues)) {
    this.setSingleReal(reference, value)
  }
}

export default function reset (play = true, resetInputValues = false) {
  this.pause()
  this.fmi2Reset(this.inst)

  if (resetInputValues) {
    this.lastInputValues = {}
  }

  this.setup()

  if (play) {
    this.play()
  }
}

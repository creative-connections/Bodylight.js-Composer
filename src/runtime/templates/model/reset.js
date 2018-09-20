export default function reset (play = true) {
  this.pause()
  this.fmi2Reset(this.inst)
  this.setup()
  if (play) {
    this.play()
  }
}

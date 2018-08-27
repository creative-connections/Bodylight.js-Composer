export default function reset () {
  this.pause()
  this.fmi2Reset(this.inst)
  this.setup()
  this.play()
}

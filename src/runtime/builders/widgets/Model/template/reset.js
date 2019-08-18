export default function reset(play = true, resetInputValues = false, destroyOnReset = null) {
  this.pause()

  // reset or recreate the model instance
  if (destroyOnReset != null ? destroyOnReset : this.config.destroyOnReset) {
    this.fmi2FreeInstance(this.inst)
    this.instantiate()
  } else {
    this.fmi2Reset(this.inst)
  }

  if (resetInputValues) {
    this.lastInputValues = {}
  }
  
  this.setup()

  if (play) {
    this.play()
  }
}

export default function pause () {
  // TODO: Synchronized tick option

  if (this.modelTickInterval === null) {
    return
  }

  window.clearInterval(this.modelTickInterval)
  this.modelTickInterval = null
  createjs.Ticker.removeEventListener('tick', this.stageTick)
}

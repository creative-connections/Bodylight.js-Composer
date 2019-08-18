export default function play () {
  if (this.modelTickInterval !== null) {
    this.pause()
  }
  // TODO: Synchronized tick option
  this.modelTickInterval = window.setInterval(
    this.modelTick,
    this.config.interval
  )
  createjs.Ticker.addEventListener('tick', this.stageTick)

  this.running = true
}

export default function setSpeed(stepSize, interval) {
  if (stepSize != null) {
    stepSize = parseFloat(stepSize)
    if (isFinite(stepSize)) {
      this.config.stepSize = stepSize
    } else {
      console.warn(`stepSize ${stepSize} is not finite.`)
    }
  }

  if (interval != null) {
    interval = parseFloat(interval)
    if (isFinite(interval)) {
      this.config.interval = interval
    } else {
      console.warn(`Interval ${interval} is not finite.`)
    }
  }

  this.pause()
  this.play()
}
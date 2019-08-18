export default function init() {
  this.perf.register(this.config.id, this.config.name, this.config.type)

  this.instantiate()
  this.setup()
}

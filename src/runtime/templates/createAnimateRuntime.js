export default function createAnimateRuntime (name, source, target, id) {
  return new Promise(resolve => {
    const runtime = new AnimateRuntime(name, source, id)

    runtime.init(target).then(() => {
      resolve(runtime)
    })
  })
}

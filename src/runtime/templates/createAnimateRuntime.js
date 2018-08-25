export default function createAnimateRuntime (name, source, target) {
  return new Promise(resolve => {
    const runtime = new AnimateRuntime(name, source)

    runtime.init(target).then(() => {
      resolve(runtime)
    })
  })
}

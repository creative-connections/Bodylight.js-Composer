/* global animates */

export default function initAnimates () {
  const promises = []
  Object.entries(animates).forEach(([id, {source, root}]) => {
    // find our canvas by id
    const element = document.getElementById(id)
    if (element === null) {
      return
    }

    const promise = new Promise(resolve => {
      createAnimateRuntime(root, source, element).then(runtime => {
        animates[id] = runtime
        resolve()
      })
    })
    promises.push(promise)
  })
  return promises
}

/* global config */
/* global models */
/* global functions */

export default function initValueProviders () {
  const promises = []

  Object.entries(models).forEach(([name, model]) => {
    const configuration = config.models[name]

    promises.push(new Promise(resolve => {
      createModelRuntime(model, configuration, functions).then(instance => {
        models[name] = instance
        resolve()
      })
    }))
  })

  return promises
}

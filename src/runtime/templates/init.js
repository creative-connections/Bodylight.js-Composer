function init () {
  console.log(models)

  Object.keys(models).forEach(modelname => {
    const model = models[modelname]
    modelRuntime(model, {}).then((Model) => {
      console.log('after module ready')
    })
  })
}

export default init

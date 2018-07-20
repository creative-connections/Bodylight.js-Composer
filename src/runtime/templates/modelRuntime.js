function modelRuntime (Model, config) {
  return new Promise(function (resolve, reject) {
    new Model().ready.then(module => {
      console.log('MODULE REAAADY')
      resolve()
    })
  })
}

export default modelRuntime

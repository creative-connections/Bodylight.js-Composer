import generateTemplate from '@runtime/builders/generateTemplate'

import configuration from './configuration'
import models from './models'
import createModelRuntime from './createModelRuntime'

import cwrapFunctions from './template/cwrapFunctions'
import consoleLogger from './template/consoleLogger'
import gettersAndSetters from './template/gettersAndSetters'
import modelInit from './template/init'
import modelTick from './template/continuous/modelTick'
import stageTick from './template/continuous/stageTick'
import OutputValues from './template/OutputValues'
import registerValueListener from './template/registerValueListener'
import registerArrayListener from './template/registerArrayListener'
import registerInitialValueListener from './template/registerInitialValueListener'
import registerValueSetter from './template/registerValueSetter'
import disableListener from './template/disableListener'
import enableListener from './template/enableListener'
import updateInitialValueListeners from './template/updateInitialValueListeners'
import getReferenceFromName from './template/getReferenceFromName'
import setInitialValues from './template/setInitialValues'
import setInitialValueByName from './template/setInitialValueByName'
import updateValueByName from './template/updateValueByName'
import getValueByName from './template/getValueByName'
import setSpeed from './template/api/setSpeed'

import instantiate from './template/instantiate'
import setup from './template/setup'
import reset from './template/reset'

import continuousPlay from './template/continuous/play'
import continuousPause from './template/continuous/pause'
import continuousSetValue from './template/continuous/setValue'
import continuousUpdateValueListeners from './template/continuous/updateValueListeners'
import oneshotPlay from './template/oneshot/play'
import oneshotPause from './template/oneshot/pause'
import oneshotSetValue from './template/oneshot/setValue'
import oneshotUpdateValueListeners from './template/oneshot/updateValueListeners'

const getFunctions = () => {
  const functions = {}
  functions.cwrapFunctions = cwrapFunctions
  functions.consoleLogger = consoleLogger
  functions.gettersAndSetters = gettersAndSetters
  functions.init = modelInit
  functions.instantiate = instantiate
  functions.setup = setup
  functions.reset = reset
  functions.registerValueListener = registerValueListener
  functions.registerArrayListener = registerArrayListener
  functions.registerInitialValueListener = registerInitialValueListener
  functions.disableListener = disableListener
  functions.enableListener = enableListener
  functions.updateInitialValueListeners = updateInitialValueListeners
  functions.registerValueSetter = registerValueSetter
  functions.getReferenceFromName = getReferenceFromName
  functions.setInitialValues = setInitialValues
  functions.setInitialValueByName = setInitialValueByName
  functions.updateValueByName = updateValueByName
  functions.getValueByName = getValueByName
  functions.OutputValues = OutputValues
  functions.setSpeed = setSpeed

  functions.continuous = {}
  functions.continuous.play = continuousPlay
  functions.continuous.pause = continuousPause
  functions.continuous.setValue = continuousSetValue
  functions.continuous.modelTick = modelTick
  functions.continuous.stageTick = stageTick
  functions.continuous.updateValueListeners = continuousUpdateValueListeners

  functions.oneshot = {}
  functions.oneshot.play = oneshotPlay
  functions.oneshot.pause = oneshotPause
  functions.oneshot.setValue = oneshotSetValue
  functions.oneshot.updateValueListeners = oneshotUpdateValueListeners
  return functions
}

export default () => {

  const script = `
    config.models = ${generateTemplate(configuration())}
    const models = {}
    ${models()}
    ${generateTemplate(createModelRuntime)}
    const functions = ${generateTemplate(getFunctions())}
  `
  const html = ''
  const css = ''

  return { script, html, css }
}

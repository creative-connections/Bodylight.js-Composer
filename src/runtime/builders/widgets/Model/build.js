import generateTemplate from '../generateTemplate'

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

export default () => {
  const script = `
    config.models = ${generateTemplate(configuration())}

    const models = {}
    ${models()}

    ${generateTemplate(createModelRuntime)}

    functions = {}
    functions.cwrapFunctions = ${generateTemplate(cwrapFunctions)}
    functions.consoleLogger = ${generateTemplate(consoleLogger)}
    functions.gettersAndSetters = ${generateTemplate(gettersAndSetters)}
    functions.init = ${generateTemplate(modelInit)}
    functions.instantiate = ${generateTemplate(instantiate)}
    functions.setup = ${generateTemplate(setup)}
    functions.reset = ${generateTemplate(reset)}
    functions.registerValueListener = ${generateTemplate(registerValueListener)}
    functions.registerArrayListener = ${generateTemplate(registerArrayListener)}
    functions.registerInitialValueListener = ${generateTemplate(registerInitialValueListener)}
    functions.disableListener = ${generateTemplate(disableListener)}
    functions.enableListener = ${generateTemplate(enableListener)}
    functions.updateInitialValueListeners = ${generateTemplate(updateInitialValueListeners)}
    functions.registerValueSetter = ${generateTemplate(registerValueSetter)}
    functions.getReferenceFromName = ${generateTemplate(getReferenceFromName)}
    functions.setInitialValues = ${generateTemplate(setInitialValues)}
    functions.setInitialValueByName = ${generateTemplate(setInitialValueByName)}
    functions.updateValueByName = ${generateTemplate(updateValueByName)}
    functions.getValueByName = ${generateTemplate(getValueByName)}
    functions.OutputValues = ${generateTemplate(OutputValues)}
    functions.setSpeed = ${generateTemplate(setSpeed)}

    functions.continuous = {}
    functions.continuous.play = ${generateTemplate(continuousPlay)}
    functions.continuous.pause = ${generateTemplate(continuousPause)}
    functions.continuous.setValue = ${generateTemplate(continuousSetValue)}
    functions.continuous.modelTick = ${generateTemplate(modelTick)}
    functions.continuous.stageTick = ${generateTemplate(stageTick)}
    functions.continuous.updateValueListeners = ${generateTemplate(continuousUpdateValueListeners)}

    functions.oneshot = {}
    functions.oneshot.play = ${generateTemplate(oneshotPlay)}
    functions.oneshot.pause = ${generateTemplate(oneshotPause)}
    functions.oneshot.setValue = ${generateTemplate(oneshotSetValue)}
    functions.oneshot.updateValueListeners = ${generateTemplate(oneshotUpdateValueListeners)}
  `
  const html = ''
  const css = ''

  return { script, html, css }
}

---
id: api_model
title: Model
---

## pause()
```javascript
model.pause()
```
Pauses the continuous model, this is ignored in OneShot.


## play()
```javascript
model.play()
```
Continues the model execution.


## reset()
```javascript
model.reset(play, resetInputValues)
```
1. `play` [boolean][4] (default: `true`)
if true the model will be running after the reset.
2. `resetInputValues` [boolean][4] (default: `false`) if true the model will forget previously set values, useful in case we want to reset input Widgets, to their model given default values.


## setSpeed()
```javascript
model.setSpeed(stepSize, interval)
```
Configures the simulation speed of the model.

1. `stepSize`[{number}][3] simulation time between steps.
2. `interval`[{number}][3] [ms] how often should model step. Lower limit is determined by the browser, safe option should be 10ms.

#### Usage
```javascript
const stepSize = model.config.stepSize;
const interval = model.config.interval;
model.setSpeed(stepSize * 2, interval * 2);
```


## getValueByName()
```javascript
model.getValueByName(name)
```
* Returns `value`[{fmi2Real}][10] of a variable matching the given `name`[{string}][2].


## updateValueByName()
```javascript
model.updateValueByName(name, modifier)
```
* `modifier`[{function][6]|[number}][3]

Updates the value of the variable matching the given `name`[{string}][2] to the value of `modifier`. If `modifier` is a function then it will be called with the previous value of the variable.

Value will be set before the next step of the model.

#### Usage
```javascript
model.updateValueByName(‘name’, 150)
```
```javascript
model.updateValueByName(‘name’, value => value * 10)
```
```javascript
model.updateValueByName(‘name’, value => {
  // do other stuff here
  return value * 150
})
```


# Lower-level API

## getReferenceFromName()
```javascript
model.getReferenceFromName(name)
```
* Returns `reference`[{fmi2ValueReference}][10] to a variable matching the given  `name` [{string}][2]. If not found, returns [{null}][0].


## getSingleReal()
```javascript
model.getSingleReal(reference)
```
* Returns `value`[{fmi2Real}][10] of a variable matching the given `reference`[{fmi2ValueReference}][10].


## getSingleBoolean()
```javascript
model.getSingleBoolean(reference)
```
* Returns `value`[{fmi2Boolean}][10] of a variable matching the given `reference`[{fmi2ValueReference}][10].

## setValue()
```javascript
model.setValue(reference, value)
```
* Sets the `value`[{fmi2Real}][10] of the given `reference`[{fmi2ValueReference}][10] before the next step of the model.


[0]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[4]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[5]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function



[10]: docs/variabletypes

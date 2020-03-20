---
id: index
title: Index
version:2.0
---

This section describes how to use and customize web components of Bodylight.js.

# Introduction

Web Components is a suite of different technologies allowing you to create reusable 
custom elements — with their functionality encapsulated away from the rest of your code.
More info at [1].

Web components of Bodylight library are exported as custom elements with `bdl` prefix.
Available are these components
* `<bdl-receptacle></bdl-receptacle>` Renders a receptacle graphics which is full or empty based on the values provided
* `<bdl-range></bdl-range>` Renders a range input which may trigger a value
* `<bdl-bind2previous><</bdl-bind2previous>` Binds values of 2 components 
* `<bdl-fmi></bdl-fmi>` Creates control buttons in order to control simulation of the model
* `<bdl-dygraph></bd-dygraph>` Creates a graph controlled by Dygraph library [2]

Further webcomponents can be exported by ammending the `src/mainwebcomponent.js` and building the bodylight.bundle.js.

# Adding web component into web page

Web components are supported by modern browsers. 
Script with bundle `bodylight.bundle.js` can be used to add bodylight web components into any web application or web page.

The following HTML snippet loads first the `bodylight.bundle.js` script and use custom-elements `<bdl-fmi>` with attributes
`fminame=""` and `targetsource=""` to specify target for annotation. There is additionally button to hide the `<div>` containing the custom element.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Bodylight web component</title>
     <script type="module" src="bodylight.bundle.js"></script>
     <script type="module" src="modelfmi.js"></script>
  </head>
<body aurelia-app="mainwebcomponent">
<h1>Test</h1>
  <bdl-range id="id1" min="40" max="180" step="1" default="60"></bdl-range>

  <bdl-receptacle id="id2" hx="100" hy="100" px="50" py="50"></bdl-receptacle>

  <bdl-bind2previous fromid="id1" toid="id2"></bdl-bind2previous>

  <bdl-fmi id="id4" fminame="MeursHemodynamics_Model_vanMeursHemodynamicsModel" 
    tolerance="0.001" starttime="0" guid="{1cd90fb1-006b-4957-b1f2-012702efe021}" 
    valuereferences="637534215,637534232" inputs="id1,16777216" otherinputs="id3"></bdl-fmi>

  <bdl-dygraphchart width="600" height="300" fromid="id4" inputs="time,aorta pressure,ventricle pressure"></bdl-dygraphchart>
</body>
</html>
```
# Range, bdl-range
`<bdl-range>` Renders a range input which may trigger a value. With following attributes:
  * `id` unique id
  * `min`, `max` minimum and maximum range value (default 0,100)
  * `step`, step between the range values (default 1)
  * `default`, default value of the range component (default 50)

# Receptacle, bdl-receptacle
`<bdl-receptacle id="id10" hx="100" hy="100" px="50" py="50"></bdl-receptacle>` Renders a range input which may trigger a value. With following attributes:
  * `id` unique id
  * `hx` maximum *x* point of the receptacle shape (default 100)
  * `hy` maximum *y* point of the receptacle shape (default 100)
  * `px` middle *x* point of the shape (default 50)
  * `py` middle *y* point of the shape (default 50)
  
# Bind2previous, bdl-bind2previous
`<bdl-bind2previous fromid="id9" toid="id10" toattribute="hx"></bdl-bind2previous>` Binds values of 2 components. With following attributes:
  * `fromid` unique id of the source element, which events are to be listened
  * `toid` unique id of the target element, the `input` event are handled and value of the target element is set
  * `toattribute` (optional) name of the attribute to be set, if not defined 'value' is set.
  
# FMI, bdl-fmi
`<bdl-fmi></bdl-fmi>` Creates control buttons in order to control simulation of the model. With these attributes:
  * `fminame` name of the model as it exactly appears in exported JS,WASM code
  * `tolerance` tolerance of the solver (default 0.001)
  * `starttime` start time of the simulation (default 0)
  * `guid` guid as it appears in FMU model description
  * `valuereferences` references to variables, custom event 'fmidata' with `event.detail` set to  `{time: number , data:[number,...]}` where time is timepoint of the current simulation step and data is array of values in same order as in 
  valuereferences
  * `inputs` ids of components and references of values to be set when event 'change' is triggered by the component
  * `otherinputs` ids of components which triggers custom event 'fmiinput', it is expected that in event.detail contains 
  this structure `{ valuereference: number, value: number }`
  
# Beaker, bdl-beaker, bdl-beakercontrols
`<bdl-beaker></bdl-beaker>` Creates a beaker with controllable width and height
  *    

# References

[1]:# Web Components: https://developer.mozilla.org/en-US/docs/Web/Web_Components

[2]:# Dygraph: https://dygraphs.com

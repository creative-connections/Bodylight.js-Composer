---
id: plotly_chart
title: Plotly chart
---

## clear()
```javascript
chart.clear()
```

Removes all traces from the chart, until the next update.

## setTraceVisibility()
```javascript
chart.setTraceVisibility(index, visible)
```
Shows or hides a trace in the chart. Trace continues to be updated.

1. `index`[number][3] sequential index of the trace, indexed from 0.
1. `visible`[boolean][4] `false` hides the trace, `true` displays the trace.

## enableTraceUpdates()
```javascript
chart.enableTraceUpdates(index)
```
Enables update for a specific trace, identified by it's position in the legend.

1. `index`[number][3] sequential index of the trace, indexed from 0.

## disableTraceUpdates()
```javascript
chart.disableTraceUpdates(index)
```
Disables update for a specific trace, identified by it's position in the legend.

1. `index`[number][3] sequential index of the trace, indexed from 0.

## duplicateTrace()
```javascript
chart.duplicateTrace(index, randomizeColor)
```
Appends a duplicated trace, this trace will not receive updates.

1. `index`[number][3] sequential index of the trace, indexed from 0.
1. `randomizeColor`[boolean][4] if true the duplicated trace will have a different color. Default: `true`.

## deleteTrace()
```javascript
chart.deleteTrace(index)
```
Removes specified trace.

1. `index`[number][3] sequential index of the trace, indexed from 0.

## deleteLastTrace()
```javascript
chart.deleteLastTrace()
```
Removes last trace.

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number
[4]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

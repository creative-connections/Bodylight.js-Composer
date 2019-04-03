---
id: 5_events_and_actions
title: Events and Actions
---

### Add reset button
* Drag the Button widget from the Blocks palette to the right of the second range, so that it is inserted below this range.
* Name the button "Reset simulation"
<video loop controls>
  <source src="../img/simple_project/resetadd.webm" type="video/webm">
  <source src="../img/simple_project/resetadd.mp4" type="video/mp4">
</video>


### Configure reset model action
* Click the button to select it.
* Set the mode of the button to the "Button triggers an event" option in the Mode section.
* Click "Add event" in the Events section.
* Select the "On-click" event.
* Select the "Reset model" action to be triggered.
* Select the "Lissajous" model so that the action is performed on it.

<video loop controls>
  <source src="../img/simple_project/actionresetmodel.webm" type="video/webm">
  <source src="../img/simple_project/actionresetmodel.mp4" type="video/mp4">
</video>

<br/>
* Preview the simulator

<video loop controls>
  <source src="../img/simple_project/previewreset.webm" type="video/webm">
  <source src="../img/simple_project/previewreset.mp4" type="video/mp4">
</video>

<br/>
* the button restsarts the model but
* mr. Wrong Wrongington Wrongstein &ndash; an action to reset chart must be added.

### Create action - clear chart
* Drag the action widget from the Blocks palette to the canvas.

<video loop controls>
  <source src="../img/simple_project/createaction.webm" type="video/webm">
  <source src="../img/simple_project/createaction.mp4" type="video/mp4">
</video>
<br/>
* Name the action "Clear chart"
* Write "Removes traces from chart" to the Description

<video loop controls>
  <source src="../img/simple_project/configureaction.webm" type="video/webm">
  <source src="../img/simple_project/configureaction.mp4" type="video/mp4">
</video>

write code

```JavaScript
chart.clear()
```

connect with button
<video loop controls>
  <source src="../img/simple_project/connectaction.webm" type="video/webm">
  <source src="../img/simple_project/connectaction.mp4" type="video/mp4">
</video>

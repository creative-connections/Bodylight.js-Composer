---
id: 4_controls
title: Controls
---

## Add a range widget to controll the cosinus frequency
* Drag the Range widget (slider) from the Blocks palette to the right column on the canvas.
* Name the range "cosinus frequency"
* Click the button with "none" text to set the target variable
* Select the "Lissajous:cosinus_frequency variable in the pop-up window
* Set the maximum for the range to 2. Minimum can be left at 0, so that the frequency may range from 0 to 2.

<video loop controls>
  <source src="../img/simple_project/range.webm" type="video/webm">
  <source src="../img/simple_project/range.mp4" type="video/mp4">
</video>


## Add range for cosinus shift
* Add similarly slider for the cosinus shift, bind it to Lissajous:cosinus_shift variable and set the limits to (0,2).

## Add label for cosinus frequency, add label for sinus frequency
* Drag the "Label" widget from the "Blocks palette" to the left of the frequency slider.
* Select the new Label
* Name it "Cosinus frequency"
* Do the same for the shift slider and name the new Label "Cosinus shift"
<video loop controls>
  <source src="../img/simple_project/label.webm" type="video/webm">
  <source src="../img/simple_project/label.mp4" type="video/mp4">
</video>

<br/>
* Check the result using the preview. 

<video loop controls>
  <source src="../img/simple_project/controls.webm" type="video/webm">
  <source src="../img/simple_project/controls.mp4" type="video/mp4">
</video>

The project in the current stage may be downloaded [here](../examples/simple_project/simple_project_3.bjp) and the simulator is:

<iframe class='fullwidth' height="450" src="../examples/simple_project/simple_project_3.html"></iframe>

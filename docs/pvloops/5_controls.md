---
id: 5_controls
title: Controls
---

<iframe src="https://www.youtube-nocookie.com/embed/X1dxPbqIjW8" frameBorder="0" width="100%" height="400px" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

* Drag the Row / Column component to the canvas below the heart animation
* Drag a label component into the new row
* And name it “Heart rate”
* Drag a slider component to the canvas below the label
* Name the slider “Heart rate”
* Select the row containing the label and slider
* In the Flex pane set the Flex grow to 0 in the Flex pane
* Select the row containing the animation and set the Flex grow to 0
* And set the Min height to “auto” for the slider row
* Select the heart rate slider
* Set maximum to 180 and minimum to 40
* And bind it to HeartRate_beat_per_min
* Now let’s see if the animation reacts to slider change
* Click the bind icon next to the Label text input
* And bind the label to HeartRate_beat_per_min
* Next click the function icon next to the bind one
* This piece of code returns text based on the incoming value
* If we prepend “Heart rate” it will be prepended in the simulator too
* We can also add units
* We have successfully displayed the value
* Let's tidy it up and round the value
* Next time we will display phases

[Composer project file (.bjp)](../examples/pvloops/4.bjp)

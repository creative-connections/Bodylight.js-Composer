---
id: 3_adding_the_heart
title: Adding the heart
---

For this part you will need the <a href="../examples/pvloops/Heart.js" download>Heart.js file</a> and the <a href="../examples/pvloops/CardiovascularModelBodylightCardiovascularBodyLight_CardioVascular.zip" download>Model file</a>.

<iframe src="https://www.youtube-nocookie.com/embed/Huofn7gwGm0" frameBorder="0" width="100%" height="400px" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>


* Let’s add the Modelica model which will provide simulation data
* Drag the fmi Model component from the Blocks palette to the canvas
* Select the model file
* Set the step length to 0.2
* We will be adjusting the step length throughout the tutorial
* To better highlight the configured features
* Next rename the model to “HeartModel”
* And set the model step interval to 4 ms
* Next we will add a Heart animation to our simulator
* Drag the Animation component into the left Row container
* And select the animation file
* There are multiple control elements of the animation
* Note that valves can start in a closed or an open state
* You can also double click the animation to select elements
* Lastly we set the padding right and padding left to “10%”
* In the next part we will connect the animation with the model

[Composer project file (.bjp)](../examples/pvloops/2.bjp)

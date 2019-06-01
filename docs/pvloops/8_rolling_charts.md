---
id: 8_rolling_charts
title: Rolling charts
---

<iframe src="https://www.youtube-nocookie.com/embed/2dU6qsx7ZdY" frameBorder="0" width="100%" height="400px" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

* Let’s start by setting the Height to “50%”
* Drag the Row / Column component to the right column to add a new row
* Drag a chart component to the first row of the right column
* Name it “Pressure”
* Set the Chart type to Line chart - Plot.ly
* And add a new dataset “Aortic pressure”
* Bind the y axis to pressureAorta_mmHg
* Increase the Step length to 0.01 to speed up the model
* Add another dataset “Atrial pressure”
* Bind it to pressureLeftAtrium_mmHg
* And finally add “Ventricular pressure”
* And bind it to pressureLeftVentricle_mmHg
* Set the Y Axis Title to ”Pressure [mmHg]”
* Speed up the model
* Set the Maximum samples for aortic pressure to 100
* When 100 samples are plotted, the aortic pressure chart starts to be deleted
* Set Maximum samples for both “Arterial pressure” and “Ventricular pressure”
* Preview – when 100 samples are plotted the chart starts to move to the right
* Next we add the “Volume” chart
* And new dataset “Atrium volume”
* Bind the y axis to volumeLeftAtrium_ml
* Add dataset “Ventricle volume”
* Bind the y axis to volumeLeftVentricle_ml
* And set Maximum samples for both
* Set the Title of Y axes to “Volume [ml]”
* In the next part we will add an inotropy slider

[Composer project file (.bjp)](../examples/pvloops/7.bjp)

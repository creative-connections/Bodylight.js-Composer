---
id: 7_pressure_volume_chart
title: Pressure volume chart
---

<iframe src="https://www.youtube-nocookie.com/embed/CL5gtVdM-FA" frameBorder="0" width="100%" height="400px" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

* Let’s add a pressure-volume parametric chart to start with
* Drag the Chart from the Blocks palette to the middle column
* Select the middle column
* Set the Height to 50%
* Select the chart
* And name it “Left ventricle PV”
* Select the Line chart - Plot.ly in the Chart type selector
* Open the Dataset pane and click Add dataset
* Each dataset is a separate line in the final chart
* Open the newly created dataset pane
* And name the dataset “PV”
* Disable showing legend, since we only have one dataset
* Bind the y axis to pressureLeftVentricle_mmHg
* Uncheck the x is controlled by time check box
* Bind the x axis to volumeLeftVentricle_ml
* The result should be a plot of pressure vs volume
* A bit too slow
* Click HeartModel in the tree view
* And increase the Step length to 0.008
* Much better
* We need to determine a fixed range for the x axis
* 70 to 160 should suffice for now
* Select the PV chart
* Open the Axes -> X Axis pane
* Click the Advanced button
* Set the “Autorange” to “false”
* Set the “range” to [70, 160]
* Set the Title of the X Axis to “Pressure [mmHg]”
* Let’s move the heart rate to check the y axis range properly
* For the y axis 60 to 160 seems appropriate
* You can always go back and adjust the ranges
* If you misjudged the first time
* Adjust the x axis “range” to [60, 160] and save
* Open the Axes->Y axis pane
* Set the Title to “Volume [ml]”
* And set the “range” to [0, 150]
* Both axes are now appropriately ranged
* In the next part we will add even more charts

[Composer project file (.bjp)](../examples/pvloops/6.bjp)

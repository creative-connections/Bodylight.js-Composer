---
id: 9_custom_actions
title: Custom actions
---

<iframe src="https://www.youtube-nocookie.com/embed/ogJnkRPGuss" frameBorder="0" width="100%" height="400px" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

* Drag the Row / Column component below the Heart rate slider
* Drag a new label into the row
* Name the label “inotropy”
* We are gonna be needing a temporary inotropy variables
* For left and right inotropy
* Connect it to leftVentricleInotropy
* Connect it to rightVentricleInotropy
* Adjust margins to separate the two temporary variables
* Both are set to 1
* Add a new slider “Inotropy”
* Bind it to leftVentricleInotropy
* Set the maximum to 2 and minimum to 0.5
* Now we can see that only one of the values is controlled
* We have to write a custom action to set the other one
* Drag the Action component from Blocks palette to the canvas
* Name it “set right inotropy”
* Next we need to add input arguments to the function
* We will need a model argument to change the inotropy
* And we will need a Range argument to get its value
* Here we update the value ‘rightVentricleInotropy’ based on range value
* Now we need to bind our action to an slider on change event
* And we set the HeartModel as Model and Inotropy as Range
* Our custom action works, both of the values get set
* So we can delete our temporary display variables
* We should also resize our row to fit the contents
* In the next part we will add marker to our PV diagram
* And functional buttons

[Composer project file (.bjp)](../examples/pvloops/8.bjp)

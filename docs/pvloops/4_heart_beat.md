---
id: 4_heart_beat
title: Heart Beat
---

<iframe src="https://www.youtube-nocookie.com/embed/arzJeHfQ2YA" frameBorder="0" width="100%" height="400px" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

* Select the ValveAOV_anim control in the left tree view
* Click the Value button, search for the valveAOV variable and select it
* Set Maximum to 1
* Select the ValvePV_anim animation control
* And bind it to the ValvePV variable
* Next we will bind the ValveMV_anim
* Note that the animation starts in an open state
* So we need to reverse the input from the model
* Now we can check if the valves are working properly
* They are, although a bit too fast
* We decrease the step speed of the model
* Lovely
* Next we bind the AtriumLeft_anim to volumeLeftAtrium_ml
* The AtriumRight_anim to volumeRightAtrium_ml
* And preview the results
* Lastly we bind the VentricleLeft_anim to volumeLeftVentricle_ml
* And VentricleRight_anim to volumeRightVentricle_ml
* And check the results, a beating heart!
* In the next part we will control the heart rate

[Composer project file (.bjp)](../examples/pvloops/3.bjp)

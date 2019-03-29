---
id: simple_project_2
title: Adding and visualising the model
---

Firstly we should look at our model, it is fairly straight-forward since the only outputs we need are sinus
and cosinus.

```
within ;
model Lissajous
  parameter Real sinus_shift = 0;
  parameter Real cosinus_shift = 0;  
  parameter Real sinus_frequency = 1;
  parameter Real cosinus_frequency = 1;
  Real sinus;
  Real cosinus;

equation
  sinus = Modelica.Math.sin(
    (time + sinus_shift) * sinus_frequency
  );
  cosinus = Modelica.Math.cos(
    (time + cosinus_shift) * cosinus_frequency
  );
end Lissajous;
```

Start by downloading [the model](examples/simple_project/Lissajous.zip), this file contains compiled code which the Composer can run. More information about the compilation process can be found in [compiling Modelica](mo_compilation/).

## Adding the model

Drag&Drop the Model Widget anywhere to the main composer window.

<video loop controls><source src="img/simple_project/dndmodel.webm" type="video/webm"></video>

And then upload the model .zip file in the displayed drop area.

---
id: introduction
title: Introduction
---

Bodylight.js Composer is a visual editor for creating in-browser dynamic applications and visualizations. It utilizes the Modelica language as the motor behind the running simulations.

Within 15 minutes, you can easily turn this Modelica code

```modelica
  Real sinus;
  Real cosinus;
  parameter Real sinus_shift = 0;
  parameter Real cosinus_shift = 0;  
  parameter Real sinus_frequency = 1;
  parameter Real cosinus_frequency = 1;
equation
  sinus = Modelica.Math.sin( (time + sinus_shift) * sinus_frequency )
  cosinus = Modelica.Math.cos( (time + cosinus_shift) * cosinus_frequency )
```

into this in-browser running application.

<iframe class='fullwidth' height="350" src="./examples/introduction/introduction_2.html"></iframe>

## Composer

The Bodylight.js Composer as well as this documentation has not yet reached version 1.0, some documentation may be missing.

![Composer application screenshot](img/introduction/composer.png "Composer application screenshot")

## Showcase

### Nephron

Using composer we developed the [Nephron](http://physiome.cz/apps/Nephron/) teaching simulator.

You can find the source code at [github:jansilar/Nephron](https://github.com/jansilar/nephron)

[![Nephron](img/introduction/nephron.png "Nephron")](http://physiome.cz/apps/Nephron/)

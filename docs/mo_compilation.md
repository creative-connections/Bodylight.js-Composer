---
id: mo_compilation
title: Compiling Modelica
---

Compilation process comprises two steps

1) Translate Modelica to FMU
2) Compile FMU to WebAssembly

Simulation runtime in Bodylight.js is provided by the [Functional Mock-up Interface (FMI)](https://fmi-standard.org/), the composer is using the Functional Mock-up Units (FMUs) to interact with the running model.

OpenModelica and Dymola are currently the only programs supported and allow to export modelica code into Bodylight.js compatible FMUs. The exported units contain source code which can then be compiled into WebAssembly.

## 1. Translate Modelica to FMU

### OpenModelica
Requirements: Docker

It is currently possible to use the nightly builds of OpenModelica (running on a Linux system) to export the FMU which will work in the next step, but it is easier to use the rudimentary Docker container we have created which will export the FMU for with minimal effort.

Clone and follow the instructions in the [Bodylight.js OpenModelica Compiler](https://github.com/creative-connections/Bodylight.js-OM-Compiler) repository.

OpenModelica only includes the Euler solver in the FMU, be warned that FMUs exported from OpenModelica will be limited by this solver.

### Dymola

Requirements: Dymola with a [Source code generation](https://www.3ds.com/products-services/catia/products/dymola/code-and-model-export/) license. Tested versions of Dymola are: 2018, 2019 FD01

1) Open your model and switch to the Simulation Mode
2) Select `Simulation -> Translate -> FMU` from the menus
3) Setup the export to match the settings in the image below
4) Export the model

![Dymola FMU settings](img/mo_compilation/dymola_fmu_settings.png "Dymola FMU export settings")

## 2. Compile FMU to WebAssembly

Requirements: Docker

To compile the FMU to WebAssembly we have prepared a compilation environment in a a rudimentary Docker container.

Clone and follow the instructions in the [Bodylight.js FMU Compiler](https://github.com/creative-connections/Bodylight.js-FMU-Compiler) repository.

At the end of the process you should have a working .zip file for use in the Bodylight.js Composer.

---
id: mo_compilation
title: Compiling Modelica
---

Simulation runtime in Bodylight.js is provided by the [Functional Mock-up Interface (FMI)](https://fmi-standard.org/), the composer is using the Functional Mock-up Units (FMUs) to interact with the running model.

Compilation process for Modelica models comprises two steps

1) Translate Modelica to FMU
2) Compile FMU to WebAssembly

We have prepared a couple of Docker containers to ease the compilation process.

## 1. Translate Modelica to FMU

Only OpenModelica and Dymola are currently supported. They can export Modelica models into Bodylight.js compatible FMUs. The exported units contain source code which can be compiled into WebAssembly in the second step.

### OpenModelica

You can use a nightly build of OpenModelica (running on a Linux system) to export the FMU which will work in the next step, but it is easier to use the Docker container we have created, which will export the FMU with minimal effort.

Clone and follow the instructions in the [Bodylight.js OpenModelica Compiler](https://github.com/creative-connections/Bodylight.js-OM-Compiler) repository.

#### OpenModelica solvers
OpenModelica only includes the Euler solver in the FMU, be warned that FMUs exported from OpenModelica are limited by it.

### Dymola

Requirements: Dymola with a [Source code generation](https://www.3ds.com/products-services/catia/products/dymola/code-and-model-export/) license. Tested versions of Dymola are: 2018, 2019 FD01

1) Open your model and switch to the Simulation Mode
2) Select `Simulation -> Translate -> FMU` from the menus
3) Setup the export to match the settings in the image below
4) Export the model

![Dymola FMU settings](img/mo_compilation/dymola_fmu_settings.png "Dymola FMU export settings")

## 2. Compile FMU to WebAssembly

To compile the FMU to WebAssembly you can use a prepared compilation environment in a Docker container.

Clone and follow the instructions in the [Bodylight.js FMU Compiler](https://github.com/creative-connections/Bodylight.js-FMU-Compiler) repository.

If you are unable to use the Docker container, or you wish to set up your own compilation pipeline you can reuse the compilation scripts from inside the container. You will need a working [Emscripten](https://emscripten.org/docs/getting_started/downloads.html) environment.

## Results
At the end of the process you should have a working .zip file for use in the Bodylight.js Composer.

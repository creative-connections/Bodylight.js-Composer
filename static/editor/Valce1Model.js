/**
 * Valce1Model.js - Simulation model for valve animation
 * This file provides a simple FMU-compatible model for valve simulation
 * It's designed to work with the Valce1.js animation in Bodylight.js
 */
window.Valce1Model = {
  init: function() {
    console.log('Valce1Model initialized');
    
    // Initial model state
    let state = {
      elapsedTime: 0,
      valvePosition: 0.5,  // Initial valve position (0-1)
      flow: 0,             // Fluid flow
      pressure: 0,         // Pressure
      coefficient: 0.1     // Flow coefficient (can be controlled via input)
    };
    
    return {
      instantiate: function(fmiobject) {
        console.log('Valce1Model instantiated with FMI object:', fmiobject);
        
        return {
          // Simulation method called at each step
          simulate: function(dt) {
            // Update time
            state.elapsedTime += dt;
            
            // Read coefficient from inputs if available
            if (fmiobject && fmiobject.inputs && fmiobject.inputs.length > 0) {
              state.coefficient = fmiobject.inputs[0] || 0.1;
            }
            
            // Simple valve model: oscillating valve position
            state.valvePosition = 0.5 + 0.4 * Math.sin(state.coefficient * 10 * state.elapsedTime);
            
            // Calculate flow based on valve position
            state.flow = state.coefficient * state.valvePosition * 10;
            
            // Calculate pressure as function of flow and valve position
            state.pressure = state.flow * (1 - state.valvePosition) * 0.5;
            
            // Update FMI outputs
            if (fmiobject && fmiobject.outputs) {
              fmiobject.outputs[0] = state.valvePosition;
              fmiobject.outputs[1] = state.flow;
              fmiobject.outputs[2] = state.pressure;
            }
            
            // Return the updated state
            return {
              valvePosition: state.valvePosition,
              flow: state.flow,
              pressure: state.pressure,
              elapsedTime: state.elapsedTime
            };
            state.elapsedTime += dt;
            
            // Считываем входные параметры от пользовательского интерфейса
            // Предполагается, что у нас есть слайдер, управляющий клапаном
            let targetValvePosition = fmiobject.getInput(0) || 0.5;
            
            // Постепенно меняем положение клапана
            let valveDelta = (targetValvePosition - state.valvePosition) * Math.min(dt * 3, 1);
            state.valvePosition += valveDelta;
            
            // Рассчитываем поток и давление на основе положения клапана
            // Простая модель: поток пропорционален открытию клапана
            state.flow = state.valvePosition * Math.sin(state.elapsedTime);
            // Давление обратно пропорционально открытию клапана
            state.pressure = (1 - state.valvePosition * 0.8) * Math.cos(state.elapsedTime * 0.5);
            
            // Отправляем выходные данные на графики и другие компоненты
            fmiobject.setOutput(0, state.valvePosition);  // Положение клапана
            fmiobject.setOutput(1, state.flow);           // Поток
            fmiobject.setOutput(2, state.pressure);       // Давление
          },
          
          // Вызывается при остановке симуляции
          terminate: function() {
            console.log('Valce1Model terminated');
          }
        };
      }
    };
  }
};

// Valce.js - модель клапанов
window.Valce = {
  init: function() {
    console.log('Valce model initialized');
    return {
      // заглушка для FMU модели
      instantiate: function(fmiobject) {
        console.log('Valce model instantiated');
        return {
          simulate: function(dt) {
            // симуляция модели
            console.log('Simulation step with dt=' + dt);
            // обновляем значения для графиков
            fmiobject.setOutput(0, Math.sin(fmiobject.time)); // el
            fmiobject.setOutput(1, Math.cos(fmiobject.time)); // V
            fmiobject.setOutput(2, Math.sin(fmiobject.time) * Math.cos(fmiobject.time)); // P
          },
          terminate: function() {
            console.log('Valce model terminated');
          }
        };
      }
    };
  }
};

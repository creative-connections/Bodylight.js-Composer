(function (cjs, an) {

// Определяем библиотеку, как CreateJS ожидает
var lib = {};
var ss = {};
var img = {};
var p = {};
var handleComplete = function() {};

// Реализация простого изображения клапана
lib.ValceAnimation = function() {
	this.initialize();
}

lib.ValceAnimation.prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0, 0, 800, 600);

// Инициализация
lib.properties = {
	id: "Valce1Animation",
	width: 800,
	height: 600,
	fps: 30,
	manifest: []
};

// Реализуем композицию для Bodylight
an.compositions = an.compositions || {};
an.compositions['Valce1'] = {
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

// Экспортируем компоненты для Bodylight через animate-adobe
lib.addExportedComponent = function(component) {
  // Регистрация компонентов для Bodylight
  if (!window.ani) window.ani = {};
  if (!window.ani.comp) window.ani.comp = {};
  
  // Это наша модель клапана
  window.ani.comp.Valce1 = {
    // Положение клапана (0-1)
    valvePosition: 0.5,
    
    // Управление анимацией
    gotoAndPlay: function(frame) {
      console.log('Valce1: gotoAndPlay', frame);
    },
    
    gotoAndStop: function(frame) {
      console.log('Valce1: gotoAndStop', frame);
      this.valvePosition = frame / 100; // Нормализуем до 0-1
      console.log('Valve position set to:', this.valvePosition);
    },
    
    // Метод обновления состояния анимации на основе данных FMU
    update: function(fmiData) {
      // Получаем данные от FMU
      if (fmiData && fmiData.length > 0) {
        // Предполагается, что первое значение - это положение клапана (0-1)
        this.valvePosition = fmiData[0];
        console.log('Valve position updated from FMU:', this.valvePosition);
      }
    },
    
    // Оригинальный компонент для CreateJS
    component: component
  };
};

// Экспортируем ValveAnimation как компонент
lib.addExportedComponent(new lib.ValceAnimation());

})(window.createjs = window.createjs || {}, window.ani = window.ani || {});

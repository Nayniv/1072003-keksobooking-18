'use strict';

(function () {

  var getRandomNumberInRange = function (max, min) {
    return min + Math.floor(Math.random() * (max - min));
  };

  var getRandomElement = function (array) {
    return array[getRandomNumberInRange(array.length, 0)];
  };

  window.util = {
    getRandomNumberInRange: getRandomNumberInRange,
    getRandomElement: getRandomElement,
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13
  };
})();

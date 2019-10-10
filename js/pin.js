'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content;
  var pinMain = document.querySelector('.map__pin--main');
  var QUILL_HEIGHT = 22;
  var ENTER_KEYCODE = 13;

  /** @description Корректируем координаты расположения метки, на координаты, на которые указывает метка своим острым концом.
Для этого надо учесть размеры элемента с меткой.
 * @param {element} элемент с меткой.
 * @param {number} координата x метки на карте.
 * @param {number} координата y метки на карте.
 * @return {number} координата x метки на карте и координата y метки на карте.
 */

  var correctPinCoords = function (mapPin, x, y) {
    var rect = mapPin.getBoundingClientRect();

    return {
      x: x - rect.width / 2,
      y: y - rect.height
    };
  };

  var generateMapPins = function (announcements) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < announcements.length; i++) {
      var announcement;
      announcement = pinTemplate.cloneNode(true);
      fragment.appendChild(window.data.renderAnnouncement(announcement, announcements[i]));
    }

    return fragment;
  };

  var getPinMainCoordinate = function (element) {
    var rect = pinMain.getBoundingClientRect();
    var pinX = rect.width / 2;
    var pinY = rect.height + QUILL_HEIGHT;

    if (element.classList.contains('map--faded')) {
      pinY = rect.height / 2;
    }

    var x = Math.round(parseInt(pinMain.style.left, 10) + pinX);
    var y = Math.round(parseInt(pinMain.style.top, 10) + pinY);

    return {x: x, y: y};
  };

  var setAddress = function (element) {
    var coordinate = getPinMainCoordinate(element);
    var address = document.querySelector('#address');
    address.value = coordinate.x + ', ' + coordinate.y;
  };

  var pinMainClickHandler = function (evt) {
    window.map.active();

    evt.currentTarget.removeEventListener('mousedown', pinMainClickHandler);
  };

  var pinMainKeydownHandler = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.map.active();

      document.removeEventListener('keydown', pinMainKeydownHandler);
    }
  };

  pinMain.addEventListener('mousedown', pinMainClickHandler);
  document.addEventListener('keydown', pinMainKeydownHandler);

  window.pin = {
    generateMapPins: generateMapPins,
    setAddress: setAddress,
    correctPinCoords: correctPinCoords
  };
})();

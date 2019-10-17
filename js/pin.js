'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content;
  var pinMain = document.querySelector('.map__pin--main');
  /*var pin = document.querySelector('.map__pin:not(.map__pin--main)');*/
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

  var renderPins = function (pinElement, announcementData) {
    var mapPin = pinElement.querySelector('.map__pin');
    var pinImg = mapPin.querySelector('img');
    var mapPinCoords = correctPinCoords(mapPin, announcementData.location.x, announcementData.location.y);

    mapPin.style.left = mapPinCoords.x + 'px';
    mapPin.style.top = mapPinCoords.y + 'px';
    pinImg.src = announcementData.author.avatar;
    pinImg.alt = announcementData.offer.title;

    return pinElement;
  };

  var generateMapPins = function (announcements) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < announcements.length; i++) {
      var announcement = pinTemplate.cloneNode(true);
      var pin = announcement.querySelector('.map__pin');
      pin.setAttribute('data-params', JSON.stringify(announcements[i]));
      fragment.appendChild(renderPins(announcement, announcements[i]));
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

  var pinClickHandler = function (evt) {
    var pin = evt.target.closest('.map__pin:not(.map__pin--main)');

    if (pin) {
        if (document.querySelector('.popup')) {
          window.card.cardRemove();
        }
      var params = pin.getAttribute('data-params');
      var data = JSON.parse(params);
      window.card.cardShow(data);
    }


  };

  pinMain.addEventListener('mousedown', pinMainClickHandler);
  document.addEventListener('keydown', pinMainKeydownHandler);

  window.pin = {
    generateMapPins: generateMapPins,
    getPinMainCoordinate: getPinMainCoordinate,
    pinClickHandler: pinClickHandler,
  };
})();

'use strict';

(function () {
  var QUILL_HEIGHT = 22;
  var PIN_HEIGHT = 87;
  var PIN_HALF_WIDTH = 33;
  var Y_COORD_MIN = 130;
  var Y_COORD_MAX = 630 - PIN_HEIGHT;
  var pinTemplate = document.querySelector('#pin').content;
  var pinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var mapRect = map.getBoundingClientRect();
  var limitsMap = {
    top: Y_COORD_MIN - PIN_HEIGHT,
    left: 0 - PIN_HALF_WIDTH,
    right: mapRect.width - PIN_HALF_WIDTH,
    bottom: Y_COORD_MAX
  };

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

  var generateAnnouncements = function (announcements) {
    var fragment = document.createDocumentFragment();

    announcements.forEach(function (elements) {
      var announcement = pinTemplate.cloneNode(true);
      var pin = announcement.querySelector('.map__pin');
      pin.dataset.dataParams = JSON.stringify(elements);
      fragment.appendChild(renderPins(announcement, elements));
    });

    return fragment;
  };

  var getMainCoordinate = function () {
    var rect = pinMain.getBoundingClientRect();
    var pinX = rect.width / 2;
    var pinY = rect.height + QUILL_HEIGHT;

    if (document.querySelector('.map').classList.contains('map--faded')) {
      pinY = rect.height / 2;
    }

    var x = Math.round(parseInt(pinMain.style.left, 10) + pinX);
    var y = Math.round(parseInt(pinMain.style.top, 10) + pinY);

    return {x: x, y: y};
  };

  var pinMainClickHandler = function () {
    window.map.active();
  };

  var pinMainKeydownHandler = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      window.map.active();
    }
  };

  pinMain.addEventListener('mousedown', pinMainClickHandler);
  document.addEventListener('keydown', pinMainKeydownHandler);

  pinMain.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var isDrag = true;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      if (isDrag) {
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      }

      if (parseInt(pinMain.style.top, 10) < limitsMap.top) {
        pinMain.style.top = limitsMap.top + 'px';
      } else if (parseInt(pinMain.style.top, 10) > limitsMap.bottom) {
        pinMain.style.top = limitsMap.bottom + 'px';
      } else if (parseInt(pinMain.style.left, 10) < limitsMap.left) {
        pinMain.style.left = limitsMap.left + 'px';
      } else if (parseInt(pinMain.style.left, 10) > limitsMap.right) {
        pinMain.style.left = limitsMap.right + 'px';
      }

      window.form.setAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      isDrag = false;
      window.form.setAddress();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  window.pin = {
    generateAnnouncements: generateAnnouncements,
    getMainCoordinate: getMainCoordinate,
  };
})();

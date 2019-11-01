'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var map = document.querySelector('.map');
  var main = document.querySelector('main');

  var showAnnouncements = function (data) {
    document.querySelector('.map__pins').appendChild(window.pin.generateMapPins(data));
  };

  var onError = function (message) {
    main.appendChild(window.errorMessage.show(message));
  };

  var onSuccess = function (data) {
    window.defaultData = data;
    showAnnouncements(data);
  };

  var activeMap = function () {
    window.form.adForm.classList.remove('ad-form--disabled');
    document.querySelector('.map').classList.remove('map--faded');
    window.form.stateFormField(window.form.adForm, false);
    window.form.stateFormField(mapFilters, false);
    window.form.setAddress();
    document.querySelector('.map').classList.remove('map--faded');
    window.backend.load(onSuccess, onError);
  };

  var disableMap = function () {
    window.form.adForm.classList.add('ad-form--disabled');
    document.querySelector('.map').classList.add('map--faded');
    window.form.stateFormField(window.form.adForm, true);
    window.form.stateFormField(mapFilters, true);
    window.form.setAddress();
  };

  var pinClickHandler = function (evt) {
    var pin = evt.target.closest('.map__pin:not(.map__pin--main)');
    var activePin = document.querySelector('.map__pin--active');

    if (pin) {
      if (document.querySelector('.popup')) {
        window.card.remove();
      }

      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }

      pin.classList.add('map__pin--active');
      var params = pin.getAttribute('data-params');
      var data = JSON.parse(params);
      window.card.show(data);
    }
  };

  var pinKeydownHandler = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      pinClickHandler();

      document.removeEventListener('keydown', pinKeydownHandler);
    }
  };

  map.addEventListener('click', pinClickHandler);
  document.addEventListener('keydown', pinKeydownHandler);

  disableMap();

  window.map = {
    disable: disableMap,
    active: activeMap
  };
})();

'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var map = document.querySelector('.map');
  var main = document.querySelector('main');
  var mapIsActive = false;

  var showAnnouncements = function (data) {
    document.querySelector('.map__pins').appendChild(window.pin.generateMapPins(data));
  };

  var onError = function (message) {
    main.appendChild(window.messages.showError(message));
  };

  var onSuccess = function (data) {
    window.fullData = data;
    mapFiltersChangeHandler();
    showAnnouncements(data);
  };

  var onSave = function () {
    main.appendChild(window.messages.showSucces());
  };

  var activeMap = function () {
    if (!mapIsActive) {
      window.form.adForm.classList.remove('ad-form--disabled');
      document.querySelector('.map').classList.remove('map--faded');
      window.form.stateFormField(window.form.adForm, false);
      window.form.stateFormField(mapFilters, false);
      window.form.setAddress();
      window.backend.load(onSuccess, onError);
      mapIsActive = true;
    }
  };

  var disableMap = function () {
    mapIsActive = false;
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
      var params = pin.dataset.dataParams;
      var data = JSON.parse(params);
      window.card.show(data);
    }
  };

  var pinKeydownHandler = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      pinClickHandler(evt);

      document.removeEventListener('keydown', pinKeydownHandler);
    }
  };

  window.form.adForm.addEventListener('submit', function (evt) {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.backend.save(new FormData(window.form.adForm), onSave, onError);
    evt.preventDefault();
    window.form.adForm.reset();
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
    if (document.querySelector('.popup')) {
      window.card.remove();
    }
    disableMap();
  });

  var mapFiltersChangeHandler = window.debounce(function () {
    var announcements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (document.querySelector('.popup')) {
      window.card.remove();
    }
    for (var i = 0; i < announcements.length; i++) {
      announcements[i].remove();
    }
    showAnnouncements(window.filters.filterAll());
  });

  map.addEventListener('click', pinClickHandler);
  document.addEventListener('keydown', pinKeydownHandler);
  mapFilters.addEventListener('change', function () {
    mapFiltersChangeHandler();
  });

  disableMap();

  window.map = {
    disable: disableMap,
    active: activeMap
  };
})();

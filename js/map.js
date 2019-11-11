'use strict';

(function () {
  var PREVIEW_IMAGE_DEFAULT = 'img/muffin-grey.svg';
  var mapFilters = document.querySelector('.map__filters');
  var map = document.querySelector('.map');
  var main = document.querySelector('main');
  var resetButton = document.querySelector('.ad-form__reset');
  var mapIsActive = false;
  var avatarInput = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview').querySelector('img');
  var imagesInput = document.querySelector('#images');
  var imagesPreview = document.querySelector('.ad-form__photo');

  var showAnnouncements = function (data) {
    document.querySelector('.map__pins').appendChild(window.pin.generateAnnouncements(data));
  };

  var onError = function (message) {
    main.appendChild(window.messages.showError(message));
  };

  var onSuccess = function (data) {
    window.fullData = data;
    showAnnouncements(window.filters.filterAll());
  };

  var onSave = function () {
    main.appendChild(window.messages.showSuccess());
  };

  var activeMap = function () {
    if (!mapIsActive) {
      window.form.ad.classList.remove('ad-form--disabled');
      document.querySelector('.map').classList.remove('map--faded');
      window.form.stateField(window.form.ad, false);
      window.form.stateField(mapFilters, false);
      window.form.setAddress();
      window.backend.load(onSuccess, onError);
      mapIsActive = true;
    }
  };

  var disableMap = function () {
    mapIsActive = false;
    window.form.ad.classList.add('ad-form--disabled');
    document.querySelector('.map').classList.add('map--faded');
    window.form.stateField(window.form.ad, true);
    window.form.stateField(mapFilters, true);
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

  window.form.ad.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(window.form.ad), onSave, onError);
    evt.preventDefault();
    reset();
    disableMap();
  });

  var mapFiltersChangeHandler = window.debounce(function () {
    var announcements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (document.querySelector('.popup')) {
      window.card.remove();
    }
    announcements.forEach(function (announcement) {
      announcement.remove();
    });
    showAnnouncements(window.filters.filterAll());
  });


  var reset = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.form.ad.reset();
    mapFilters.reset();
    resetPictures();
    if (document.querySelector('.popup')) {
      window.card.remove();
    }
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  map.addEventListener('click', pinClickHandler);
  document.addEventListener('keydown', pinKeydownHandler);
  mapFilters.addEventListener('change', function () {
    mapFiltersChangeHandler();
  });
  resetButton.addEventListener('click', function () {
    reset();
    disableMap();
  });

  var resetPictures = function () {
    avatarPreview.src = PREVIEW_IMAGE_DEFAULT;
    window.fileUpload.remove(imagesPreview);
  };

  avatarInput.addEventListener('change', function () {
    window.fileUpload.add(avatarInput, true, avatarPreview);
  });

  imagesInput.addEventListener('change', function () {
    window.fileUpload.add(imagesInput, false, imagesPreview);
  });

  disableMap();

  window.map = {
    disable: disableMap,
    active: activeMap
  };
})();

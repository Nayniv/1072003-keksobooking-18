'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var announcementData = window.data.generateAnnouncements(window.data.ANNOUNCEMENT_COUNT);
  var map = document.querySelector('.map');

  var showAnnouncements = function () {
    document.querySelector('.map__pins').appendChild(window.pin.generateMapPins(announcementData));
    window.card.show(announcementData);

  };

  var activeMap = function () {
    window.form.adForm.classList.remove('ad-form--disabled');
    document.querySelector('.map').classList.remove('map--faded');
    window.form.stateFormField(window.form.adForm);
    window.form.stateFormField(mapFilters);
    window.pin.setAddress(map);
    document.querySelector('.map').classList.remove('map--faded');
    showAnnouncements();
  };

  var disableMap = function () {
    window.form.adForm.classList.add('ad-form--disabled');
    document.querySelector('.map').classList.add('map--faded');
    window.form.stateFormField(window.form.adForm, true);
    window.form.stateFormField(mapFilters, true);
    window.pin.setAddress(map);
  };

  disableMap();

  window.map = {
    disable: disableMap,
    active: activeMap,
  };
})();
'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var announcementData = window.data.generateAnnouncements(window.data.ANNOUNCEMENT_COUNT);

  var showMap = function () {
    document.querySelector('.map__pins').appendChild(window.pin.generateMapPins(announcementData));
    window.card.createCards(announcementData);
    document.querySelector('.map').classList.remove('map--faded');
  };

  var activeMap = function () {
    window.form.adForm.classList.remove('ad-form--disabled');
    window.pin.map.classList.remove('map--faded');
    window.form.stateFormField(window.form.adForm);
    window.form.stateFormField(mapFilters);
    window.pin.setAddress();
    showMap();
  };

  var disableMap = function () {
    window.form.adForm.classList.add('ad-form--disabled');
    window.pin.map.classList.add('map--faded');
    window.form.stateFormField(window.form.adForm, true);
    window.form.stateFormField(mapFilters, true);
    window.pin.setAddress();
  };

  disableMap();

  window.map = {
    disableMap: disableMap,
    activeMap: activeMap,
    showMap: showMap
  };
})();

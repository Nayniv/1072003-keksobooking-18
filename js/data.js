'use strict';

(function () {
  var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var OFFER_TIMES = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_GUESTS_MAX = 10;
  var OFFER_ROOMS_MAX = 5;
  var OFFER_PRICE_MIN = 10000;
  var OFFER_PRICE_MAX = 50000;
  var OFFER_LOCATION_X_MIN = 50;
  var OFFER_LOCATION_X_MAX = 1100;
  var OFFER_LOCATION_Y_MIN = 130;
  var OFFER_LOCATION_Y_MAX = 630;
  var OFFER_TYPE_NAMES = {palace: 'Дворец', flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};
  var ANNOUNCEMENT_COUNT = 8;
  var SMALL_PIN_HALF_WIDTH = 25;
  var SMALL_PIN_HEIGHT = 70;

  /*var onError = function (message) {
    console.error(message);
  };

  var onSuccess = function (data) {
    window.defaultData = data;
    console.log(data);
  };

  window.backend.load(onSuccess, onError);*/


  /*var generateAnnouncements = function () {
    var announcements = [];
    for (var i = 0; i < ANNOUNCEMENT_COUNT; i++) {
      announcements.push;
    }

    return announcements;
  };*/

  window.data = {
    //generateAnnouncements: generateAnnouncements,
    ANNOUNCEMENT_COUNT: ANNOUNCEMENT_COUNT,
    OFFER_TYPE_NAMES: OFFER_TYPE_NAMES,
    OFFER_TIMES: OFFER_TIMES
  };
})();

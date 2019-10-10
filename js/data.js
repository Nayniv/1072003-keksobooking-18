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

  var getFeatures = function (array) {
    var randomFeatures = array.slice();

    randomFeatures.length = window.util.getRandomNumberInRange(array.length, 1);

    return randomFeatures;
  };

  var getLocation = function (max, min) {
    var location = window.util.getRandomNumberInRange(max, min);
    return location;
  };

  var generateAnnouncementData = function (index) {
    var announcementData = {};

    announcementData.author = {
      avatar: 'img/avatars/user0' + [index + 1] + '.png'
    };

    announcementData.location = {
      x: getLocation(OFFER_LOCATION_X_MAX, OFFER_LOCATION_X_MIN),
      y: getLocation(OFFER_LOCATION_Y_MAX, OFFER_LOCATION_Y_MIN)
    };

    announcementData.offer = {
      title: 'заголовок объявления',
      address: announcementData.location.x + ', ' + announcementData.location.y,
      price: window.util.getRandomNumberInRange(OFFER_PRICE_MAX, OFFER_PRICE_MIN),
      type: window.util.getRandomElement(OFFER_TYPES),
      rooms: window.util.getRandomNumberInRange(OFFER_ROOMS_MAX, 1),
      guests: window.util.getRandomNumberInRange(OFFER_GUESTS_MAX, 1),
      checkin: window.util.getRandomElement(OFFER_TIMES),
      checkout: window.util.getRandomElement(OFFER_TIMES),
      features: getFeatures(OFFER_FEATURES),
      description: 'описание объявления',
      photos: 'http://o0.github.io/assets/images/tokyo/hotel' + window.util.getRandomNumberInRange(4, 1) + '.jpg'
    };

    return announcementData;
  };

  var generateAnnouncements = function () {
    var announcements = [];
    for (var i = 0; i < ANNOUNCEMENT_COUNT; i++) {
      announcements.push(generateAnnouncementData(i));
    }

    return announcements;
  };

  var renderAnnouncement = function (announcementElement, announcementData) {
    var mapPin = announcementElement.querySelector('.map__pin');
    var pinImg = mapPin.querySelector('img');
    var mapPinCoords = window.pin.correctPinCoords(mapPin, announcementData.location.x, announcementData.location.y);

    mapPin.style.left = mapPinCoords.x + 'px';
    mapPin.style.top = mapPinCoords.y + 'px';
    pinImg.src = announcementData.author.avatar;
    pinImg.alt = announcementData.offer.title;

    return announcementElement;
  };

  window.data = {
    generateAnnouncements: generateAnnouncements,
    renderAnnouncement: renderAnnouncement,
    ANNOUNCEMENT_COUNT: ANNOUNCEMENT_COUNT,
    OFFER_TYPE_NAMES: OFFER_TYPE_NAMES
  };
})();

'use strict';

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TIMES = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_GUESTS_MAX = 10;
var OFFER_ROOMS_MAX = 5;
var OFFER_PRICE_MIN = 10000;
var OFFER_PRICE_MAX = 50000;
var OFFER_LOCATION_MIN = 130;
var OFFER_LOCATION_MAX = 630;
var ANNOUNCEMENT_COUNT = 8;
var pinTemplate = document.querySelector('#pin').content;

var getRandomNumberInRange = function (max, min) {
  return min + Math.floor(Math.random() * (max - min));
};

var getRandomElement = function (array) {
  return array[getRandomNumberInRange(array.length, 0)];
};

var getFeatures = function (array) {
  var randomFeatures = array.slice();

  randomFeatures.length = getRandomNumberInRange(array.length, 1);

  return randomFeatures;
};

var getLocation = function () {
  var location = getRandomNumberInRange(OFFER_LOCATION_MAX, OFFER_LOCATION_MIN);
  return location;
};

var generateAnnouncementData = function () {
  var announcementData = {};

  announcementData.author = {
    avatar: 'img/avatars/user0' + getRandomNumberInRange(9, 1) + '.png'
  };

  announcementData.location = {
    x: getLocation(),
    y: getLocation()
  };

  announcementData.offer = {
    title: 'заголовок объявления',
    address: announcementData.location.x + ', ' + announcementData.location.y,
    price: getRandomNumberInRange(OFFER_PRICE_MAX, OFFER_PRICE_MIN),
    type: getRandomElement(OFFER_TYPES),
    rooms: getRandomNumberInRange(OFFER_ROOMS_MAX, 1),
    guests: getRandomNumberInRange(OFFER_GUESTS_MAX, 1),
    checkin: getRandomElement(OFFER_TIMES),
    checkout: getRandomElement(OFFER_TIMES),
    features: getFeatures(OFFER_FEATURES),
    description: 'описание объявления',
    photos: 'http://o0.github.io/assets/images/tokyo/hotel' + getRandomNumberInRange(4, 1) + '.jpg'
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

/** @description Корректируем координаты расположения метки, на координаты, на которые указывает метка своим острым концом.
Для этого надо учесть размеры элемента с меткой.

 * @param {Element} элемент с меткой.
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

var renderAnnouncement = function (announcementElement, announcementData) {
  var mapPin = announcementElement.querySelector('.map__pin');
  var pinImg = mapPin.querySelector('img');
  var mapPinCoords = correctPinCoords(mapPin, announcementData.location.x, announcementData.location.y);

  mapPin.style.left = mapPinCoords.x + 'px';
  mapPin.style.top = mapPinCoords.y + 'px';
  pinImg.src = announcementData.author.avatar;
  pinImg.alt = announcementData.offer.title;

  return announcementElement;
};

var generateMapPins = function (announcements) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < announcements.length; i++) {
    var announcement;
    announcement = pinTemplate.cloneNode(true);
    fragment.appendChild(renderAnnouncement(announcement, announcements[i]));
  }

  return fragment;
};

var showMap = function showMap() {
  var announcements = generateAnnouncements(ANNOUNCEMENT_COUNT);
  document.querySelector('.map__pins').appendChild(generateMapPins(announcements));
  document.querySelector('.map').classList.remove('map--faded');
};

showMap();

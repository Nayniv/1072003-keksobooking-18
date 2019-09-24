'use strict';

var AVATAR_TEMPLATE = 'img/avatars/user{{xx}}.png';
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TIMES = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_GUESTS_MAX = 10;
var OFFER_ROOMS_MAX = 5;
var OFFER_ADDRESS_MAX = 999;
var OFFER_PRICE_MIN = 10000;
var OFFER_PRICE_MAX = 50000;
var OFFER_PHOTO = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OFFER_LOCATION_MIN = 130;
var OFFER_LOCATION_MAX = 630;
var ANNOUNCEMENT_COUNT = 8;
var fragment = document.createDocumentFragment();
var template = document.querySelector('#pin').content;

var getRandomNumberInRange = function (max, min) {
  return min + Math.floor(Math.random() * (max - min));
};

var getRandomElement = function (array) {
  return array[getRandomNumberInRange(array.length)];
};

var getFeatures = function (array) {
  var randomFeatures = array.slice();

  randomFeatures.length = getRandomNumberInRange(array.length, 0);
  if (randomFeatures.length === 0) {
    randomFeatures.length = getRandomNumberInRange(array.length, 0);
  }

  return randomFeatures;
};

var generateAnnouncementData = function (index) {
  var announcementData = {};

  announcementData.author = {
    avatar: 'img/avatars/user0' + getRandomNumberInRange(1,8) + '.png'
  };

  announcementData.offer = {
    title: 'заголовок объявления',
    address: getRandomNumberInRange(OFFER_ADDRESS_MAX) + ', ' + getRandomNumberInRange(OFFER_ADDRESS_MAX),
    price: getRandomNumberInRange(OFFER_PRICE_MAX, OFFER_PRICE_MIN),
    type: getRandomElement(OFFER_TYPES),
    rooms: getRandomNumberInRange(OFFER_ROOMS_MAX, 1),
    guests: getRandomNumberInRange(OFFER_GUESTS_MAX, 1),
    checkin: getRandomElement(OFFER_TIMES),
    checkout: getRandomElement(OFFER_TIMES),
    features: getFeatures(OFFER_FEATURES),
    description: 'описание объявления',
    photos: getRandomElement(OFFER_PHOTO)
  };

  announcementData.location = {
    x: getRandomNumberInRange(OFFER_LOCATION_MAX, OFFER_LOCATION_MIN),
    y: getRandomNumberInRange(OFFER_LOCATION_MAX, OFFER_LOCATION_MIN)
  };

  return announcementData;
};

var generateAnnouncements = function (announcementNumber) {
  var announcements = [];
  for (var i = 0; i < announcementNumber; i++) {
    announcements.push(generateAnnouncementData(i));
  }

  return announcements;
};

var correctButtonCoords = function (button, x, y) {
  var rect = button.getBoundingClientRect();

  return {
    x: x - rect.width / 2,
    y: y - rect.height
  };
};

var renderAnnouncement = function (announcementElement, announcementData) {
  var button = announcementElement.querySelector('.map__pin');
  var img = button.querySelector('img');
  var buttonCoords = correctButtonCoords(button, announcementData.location.x, announcementData.location.y);

  button.style.left = buttonCoords.x + 'px';
  button.style.top = buttonCoords.y + 'px';
  img.src = announcementData.author.avatar;
  img.alt = announcementData.offer.title;

  return announcementElement;
};

var generateMapPins = function (announcements) {
  var announcement;

  for (var i = 0; i < announcements.length; i++) {
    announcement = template.cloneNode(true);
    fragment.appendChild(renderAnnouncement(announcement, announcements[i]));
  }

  return fragment;
};

var showMap = function showMap() {
  document.querySelector('.map__pins').appendChild(generateMapPins(generateAnnouncements(ANNOUNCEMENT_COUNT)));
  document.querySelector('.map').classList.remove('map--faded');
};

showMap();

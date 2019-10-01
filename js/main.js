'use strict';

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
var ANNOUNCEMENT_COUNT = 8;
var pinTemplate = document.querySelector('#pin').content;
var cardTemplate = document.querySelector('#card').content;
var OFFER_TYPE_NAMES = {palace: 'Дворец', flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};
var form = document.querySelector('.ad-form');
var pinMain = document.querySelector('.map__pin--main');
var map = document.querySelector('.map');
var mapFilters = document.querySelector('.map__filters');
var capacity = form.querySelector('#capacity');
var roomNumber = form.querySelector('#room_number');
var ENTER_KEYCODE = 13;
var ERROR_MESSAGES = [
  '1 комната — для 1 гостя',
  '2 комнаты — для 2 гостей или для 1 гостя',
  '3 комнаты — для 3 гостей, для 2 гостей или для 1 гостя',
  '100 комнат — не для гостей'
];
var buttonSubmit = form.querySelector('.ad-form__submit');

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

var getLocation = function (max, min) {
  var location = getRandomNumberInRange(max, min);
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

/* var showMap = function () {
  var announcements = generateAnnouncements(ANNOUNCEMENT_COUNT);
  document.querySelector('.map__pins').appendChild(generateMapPins(announcements));
  createCards(announcements);
  document.querySelector('.map').classList.remove('map--faded');
}; */

var renderFeaturesList = function (featureList) {
  var features = '';
  for (var i = 0; i < featureList.length; i++) {
    features += '<li class = "popup__feature popup__feature--' + featureList[i] + '"></li>';
  }

  return features;
};

var renderCard = function (card, announcementData) {
  card.querySelector('.popup__title').textContent = announcementData.offer.title;
  card.querySelector('.popup__text--address').textContent = announcementData.offer.address;
  card.querySelector('.popup__text--price').textContent = announcementData.offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent = OFFER_TYPE_NAMES[announcementData.offer.type];
  card.querySelector('.popup__text--capacity').textContent = announcementData.offer.rooms + ' комнаты для ' + announcementData.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + announcementData.offer.checkin + ', выезд до' + announcementData.offer.checkout;
  card.querySelector('.popup__features').innerHTML = renderFeaturesList(announcementData.offer.features);
  card.querySelector('.popup__description').textContent = announcementData.offer.description;
  card.querySelector('.popup__photos').innerHTML = '<img src="' + announcementData.offer.photos + '" width="45" height="40">';
  card.querySelector('.popup__avatar').src = announcementData.author.avatar;

  return card;
};

var createCards = function (announcements) {
  var card = cardTemplate.cloneNode(true);
  document.querySelector('.map').insertBefore(renderCard(card, announcements[0]), document.querySelector('.map__filters-container'));
};

// showMap();

var stateFormField = function (element, disable) {
  var fieldForm = form.querySelectorAll('input, button, select, textarea, fieldset');
  var i;

  if (disable) {
    for (i = 0; i < fieldForm.length; i++) {
      fieldForm[i].disabled = true;
    }
  } else {
    for (i = 0; i < fieldForm.length; i++) {
      fieldForm[i].disabled = false;
    }
  }
};

var activePage = function () {
  form.classList.remove('ad-form--disabled');
  map.classList.remove('map--faded');
  stateFormField(form);
  stateFormField(mapFilters);
  setAddress();
};

var disablePage = function () {
  form.classList.add('ad-form--disabled');
  map.classList.add('map--faded');
  stateFormField(form, true);
  stateFormField(mapFilters, true);
  setAddress();
};

var getPinMainCoordinate = function () {
  var rect = pinMain.getBoundingClientRect();
  var pinX = rect.width / 2;
  var pinY = rect.height;

  if (map.classList.contains('map--faded')) {
    pinY = rect.height / 2;
  }

  var x = Math.round(parseInt(pinMain.style.left, 10) + pinX);
  var y = Math.round(parseInt(pinMain.style.top, 10) + pinY);

  return {x: x, y: y};
};

var setAddress = function () {
  var coordinate = getPinMainCoordinate(map);
  var address = document.querySelector('#address');
  address.value = coordinate.x + ', ' + coordinate.y;
};

var pinMainClickHandler = function () {
  activePage();
};

var pinMainKeydownHandler = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activePage();
  }
};

disablePage();


pinMain.addEventListener('mousedown', pinMainClickHandler);

document.addEventListener('keydown', pinMainKeydownHandler);

/*var testRoomCapacity = function () {
  // var roomNumber = form.querySelector('#room_number').value;
  // var capacity = form.querySelector('#capacity').value;
  var error = false;

  if (roomNumber === 1 && capacity > roomNumber) {
    capacity.setCustomValidity('1 комната — для 1 гостя');
    error = true;
  }

  if (roomNumber === 2 && capacity > roomNumber) {
    capacity.setCustomValidity(ERROR_MESSAGES[1]);
    error = true;
  }

  if (roomNumber === 3 && capacity > roomNumber) {
    capacity.setCustomValidity(ERROR_MESSAGES[2]);
    error = true;
  }

  if (roomNumber === 100 && capacity !== 'не для гостей') {
    capacity.setCustomValidity(ERROR_MESSAGES[3]);
    error = true;
  }

  return error;
};*/

var customValidation = function (form) {
  var capacity = form.querySelector('#capacity');
  var roomNumber = form.querySelector('#room_number');

  console.log(capacity.value, roomNumber.value);

  if (roomNumber.value === 1 && capacity.value > roomNumber.value) {
    capacity.setCustomValidity('1 комната — для 1 гостя');
  }

  else if (roomNumber.value === 2 && capacity.value > roomNumber.value) {
    capacity.setCustomValidity('2 комнаты — для 2 гостей или для 1 гостя');
  }

  else if (roomNumber.value === 3 && capacity.value > roomNumber.value) {
    capacity.setCustomValidity('3 комнаты — для 3 гостей, для 2 гостей или для 1 гостя');
  }

  else if (roomNumber.value === 100 && capacity.value !== 'не для гостей') {
    capacity.setCustomValidity('100 комнат — не для гостей');
  }
  else {
    capacity.setCustomValidity('');
  }
};

// customValidation(form);

roomNumber.addEventListener('change', function(evt){
  customValidation(form);
  if (capacity.setCustomValidity !== '') {
    evt.preventDefault();
  }
});

capacity.addEventListener('change', function (evt) {
  customValidation(form);
  if (capacity.setCustomValidity !== '') {
    evt.preventDefault();
  }
});

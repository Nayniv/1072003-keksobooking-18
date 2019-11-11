'use strict';

(function () {
  var OFFER_TYPE_NAMES = {palace: 'Дворец', flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};
  var FEATURE_TEMPLATE = '<li class="popup__feature popup__feature--{{x}}"></li>';
  var PHOTO_TEMPLATE = '<img src="{{x}}" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
  var cardTemplate = document.querySelector('#card').content;

  var renderElementsList = function (elementsList, template) {
    var list = '';
    elementsList.forEach(function (element) {
      list += template.replace(/\{\{x\}\}/g, element);
    });

    return list;
  };

  var renderCard = function (element, announcementData) {
    element.querySelector('.popup__title').textContent = announcementData.offer.title;
    element.querySelector('.popup__text--address').textContent = announcementData.offer.address;
    element.querySelector('.popup__text--price').textContent = announcementData.offer.price + '₽/ночь';
    element.querySelector('.popup__type').textContent = OFFER_TYPE_NAMES[announcementData.offer.type];
    element.querySelector('.popup__text--capacity').textContent = announcementData.offer.rooms + ' комнаты для ' + announcementData.offer.guests + ' гостей';
    element.querySelector('.popup__text--time').textContent = 'Заезд после ' + announcementData.offer.checkin + ', выезд до' + announcementData.offer.checkout;
    element.querySelector('.popup__features').innerHTML = renderElementsList(announcementData.offer.features, FEATURE_TEMPLATE);
    element.querySelector('.popup__description').textContent = announcementData.offer.description;
    element.querySelector('.popup__photos').innerHTML = renderElementsList(announcementData.offer.photos, PHOTO_TEMPLATE);
    element.querySelector('.popup__avatar').src = announcementData.author.avatar;

    return element;
  };

  var remove = function () {
    document.querySelector('.map__card').remove();
  };

  var cardCloseKeydownHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      remove();
      document.removeEventListener('keydown', cardCloseKeydownHandler);
    }
  };

  var show = function (announcementData) {
    var card = cardTemplate.cloneNode(true);
    var popupClose = card.querySelector('.popup__close');

    document.querySelector('.map').insertBefore(renderCard(card, announcementData), document.querySelector('.map__filters-container'));

    popupClose.addEventListener('click', function () {
      remove();
    });

    document.addEventListener('keydown', cardCloseKeydownHandler);
  };

  window.card = {
    show: show,
    remove: remove
  };
})();

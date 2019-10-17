'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content;
  var ESC_KEYCODE = 27;

  var renderFeaturesList = function (featureList) {
    var features = '';
    for (var i = 0; i < featureList.length; i++) {
      features += '<li class = "popup__feature popup__feature--' + featureList[i] + '"></li>';
    }

    return features;
  };

  var renderCard = function (element, announcementData) {
    element.querySelector('.popup__title').textContent = announcementData.offer.title;
    element.querySelector('.popup__text--address').textContent = announcementData.offer.address;
    element.querySelector('.popup__text--price').textContent = announcementData.offer.price + '₽/ночь';
    element.querySelector('.popup__type').textContent = window.data.OFFER_TYPE_NAMES[announcementData.offer.type];
    element.querySelector('.popup__text--capacity').textContent = announcementData.offer.rooms + ' комнаты для ' + announcementData.offer.guests + ' гостей';
    element.querySelector('.popup__text--time').textContent = 'Заезд после ' + announcementData.offer.checkin + ', выезд до' + announcementData.offer.checkout;
    element.querySelector('.popup__features').innerHTML = renderFeaturesList(announcementData.offer.features);
    element.querySelector('.popup__description').textContent = announcementData.offer.description;
    element.querySelector('.popup__photos').innerHTML = '<img src="' + announcementData.offer.photos + '" width="45" height="40">';
    element.querySelector('.popup__avatar').src = announcementData.author.avatar;

    return element;
  };

  var cardRemove = function () {
    document.querySelector('.map__card').remove();
  };

  var popupCloseKeydownHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      cardRemove();
      document.removeEventListener('keydown', popupCloseKeydownHandler);
    }
  };

  var cardShow = function (announcementData) {
    var card = cardTemplate.cloneNode(true);
    var popupClose = card.querySelector('.popup__close');

    document.querySelector('.map').insertBefore(renderCard(card, announcementData), document.querySelector('.map__filters-container'));

    popupClose.addEventListener('click', function () {
      cardRemove();
    });

    popupClose.addEventListener('keydown', popupCloseKeydownHandler);
  };

  /* var createCard = function (data) {
    var card = cardTemplate.cloneNode(true);
    var popup = card.querySelector('.popup');
    var popupClose = card.querySelector('.popup__close');

    popupClose.addEventListener('click', function () {
      cardRemove(card);
    });

    popupClose.addEventListener('keydown', popupCloseKeydownHandler);

    document.querySelector('.map').insertBefore(renderCard(card, data), document.querySelector('.map__filters-container'));
  }; */

  window.card = {
    cardShow: cardShow,
    cardRemove: cardRemove
  };
})();

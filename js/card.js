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

  var renderCard = function (card) {
    var announcementData = window.pin.pinClickHandler();

    card.querySelector('.popup__title').textContent = announcementData.offer.title;
    card.querySelector('.popup__text--address').textContent = announcementData.offer.address;
    card.querySelector('.popup__text--price').textContent = announcementData.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = window.data.OFFER_TYPE_NAMES[announcementData.offer.type];
    card.querySelector('.popup__text--capacity').textContent = announcementData.offer.rooms + ' комнаты для ' + announcementData.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + announcementData.offer.checkin + ', выезд до' + announcementData.offer.checkout;
    card.querySelector('.popup__features').innerHTML = renderFeaturesList(announcementData.offer.features);
    card.querySelector('.popup__description').textContent = announcementData.offer.description;
    card.querySelector('.popup__photos').innerHTML = '<img src="' + announcementData.offer.photos + '" width="45" height="40">';
    card.querySelector('.popup__avatar').src = announcementData.author.avatar;

    return card;
  };

  var cardHide = function (card) {
    card.classList.add('hidden');
  };

  var cardShow = function () {
    createCards();
  };

  var popupCloseKeydownHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      cardHide();

      document.removeEventListener('keydown', popupCloseKeydownHandler);
    }
  };

  var createCards = function () {
    var card = cardTemplate.cloneNode(true);
    var popup = card.querySelector('.popup');
    var popupClose = card.querySelector('.popup__close');

    popupClose.addEventListener('click', function () {
      cardHide(popup);
    });

    popupClose.addEventListener('keydown', popupCloseKeydownHandler);

    document.querySelector('.map').insertBefore(renderCard(card), document.querySelector('.map__filters-container'));
  };

  window.card = {
    hide: cardHide,
    show: cardShow
  };
})();

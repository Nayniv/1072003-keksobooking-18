'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content;

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
    card.querySelector('.popup__type').textContent = window.data.OFFER_TYPE_NAMES[announcementData.offer.type];
    card.querySelector('.popup__text--capacity').textContent = announcementData.offer.rooms + ' комнаты для ' + announcementData.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + announcementData.offer.checkin + ', выезд до' + announcementData.offer.checkout;
    card.querySelector('.popup__features').innerHTML = renderFeaturesList(announcementData.offer.features);
    card.querySelector('.popup__description').textContent = announcementData.offer.description;
    card.querySelector('.popup__photos').innerHTML = '<img src="' + announcementData.offer.photos + '" width="45" height="40">';
    card.querySelector('.popup__avatar').src = announcementData.author.avatar;

    return card;
  };

  var cardHidden = function (element) {
    element.classList.add('hidden');
  };

  var cardShow = function (announcements) {
    createCards(announcements);
  };

  var createCards = function (announcements) {
    var card = cardTemplate.cloneNode(true);
    var popup = card.querySelector('.popup');
    var popupClose = card.querySelector('.popup__close');

    popupClose.addEventListener('click', function () {
      cardHidden(popup);
    });

    document.querySelector('.map').insertBefore(renderCard(card, announcements[0]), document.querySelector('.map__filters-container'));

  };

  window.card = {
    hide: cardHidden,
    show: cardShow
  };
})();

'use strict';

(function () {
  var PINS_COUNT = 5;
  var filterTypeOfHouse = document.querySelector('#housing-type');
  var filterRoom = document.querySelector('#housing-rooms');
  var filterPrice = document.querySelector('#housing-price');
  var filterGuest = document.querySelector('#housing-guests');
  var featuresList = document.querySelector('#housing-features');

  var checkType = function (item) {
    return filterTypeOfHouse.value === 'any' || item.offer.type === filterTypeOfHouse.value;
  };

  var checkRooms = function (item) {
    return filterRoom.value === 'any' || item.offer.rooms === Number(filterRoom.value);
  };

  var checkPrice = function (item) {
    return filterPrice.value === 'any' || ((filterPrice.value === 'low') && (item.offer.price < 10000)) ||
    ((filterPrice.value === 'middle') && (item.offer.price > 10000) && (item.offer.price < 50000)) ||
    ((filterPrice.value === 'high') && (item.offer.price > 50000));
  };

  var checkGuest = function (item) {
    return filterGuest.value === 'any' || Number(filterGuest.value) !== 0 && item.offer.guests >= Number(filterGuest.value) ||
    Number(filterGuest.value) === 0 && item.offer.guests === 0;
  };

  var getCheckedFeatures = function () {
    var features = [];
    featuresList.querySelectorAll('input[name=features]').forEach(function (feature) {
      if (feature.checked) {
        features.push(feature.value);
      }
    });

    return features;
  };

  var checkFeatures = function (item) {
    var checkedFeatures = getCheckedFeatures();
    return checkedFeatures.every(function (feature) {
      return item.offer.features.indexOf(feature) !== -1;
    });
  };

  var filterAll = function () {
    return window.fullData.filter(function (item) {
      return checkType(item) && checkRooms(item) && checkPrice(item) && checkGuest(item) && checkFeatures(item);
    }).slice(0, PINS_COUNT);
  };

  window.filters = {
    filterAll: filterAll
  };
})();

'use strict';

(function () {
  var PINS_COUNT = 5;
  var filterTypeOfHouse = document.querySelector('#housing-type');
  var filterRoom = document.querySelector('#housing-rooms');
  var filterPrice = document.querySelector('#housing-price');
  var filterGuest = document.querySelector('#housing-guests');

  var checkType = function (item) {
    return filterTypeOfHouse.value === 'any' || item.offer.type === filterTypeOfHouse.value;
  };

  var checkRooms = function (item) {
    return filterRoom.value === 'any' || item.offer.rooms === filterRoom.value;
  };

  var checkPrice = function (item) {
    return filterPrice.value === 'any' || item.offer.price === filterPrice.value;
  };

  var checkGuest = function (item) {
    return filterGuest.value === 'any' || item.offer.guests === filterGuest.value;
  };

  var filterAll = function () {
    return window.fullData.filter(function (item) {
      return checkType(item) && checkRooms(item) && checkPrice(item) && checkGuest(item);
    }).slice(0, PINS_COUNT);
  };

  window.filters = {
    filterAll: filterAll
  };
})();

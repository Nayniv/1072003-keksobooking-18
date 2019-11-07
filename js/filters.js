'use strict';

(function () {
  var PINS_COUNT = 5;
  var filterTypeOfHouse = document.querySelector('#housing-type');

  var getTypeOfHouse = function (item) {
    return filterTypeOfHouse.value === 'any' || item.offer.type === filterTypeOfHouse.value;
  };

  var filterAll = function () {
    return window.fullData.filter(function (item) {
      return getTypeOfHouse(item);
    }).slice(0, PINS_COUNT);
  };

  window.filters = {
    filterAll: filterAll
  };
})();

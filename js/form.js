'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var capacity = adForm.querySelector('#capacity');
  var roomNumber = adForm.querySelector('#room_number');
  var price = adForm.querySelector('#price');
  var typeHousing = adForm.querySelector('#type');
  var typeHousingValue = typeHousing.options[typeHousing.selectedIndex].value;
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var ERROR_MESSAGES = {
    rooms1: '1 комната — для 1 гостя',
    rooms2: '2 комнаты — для 2 гостей или для 1 гостя',
    rooms3: '3 комнаты — для 3 гостей, для 2 гостей или для 1 гостя'
  };
  var MIN_PRICES = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };

  var stateFormField = function (element, isDisabled) {
    var fieldForm = adForm.querySelectorAll('fieldset');

    for (var i = 0; i < fieldForm.length; i++) {
      fieldForm[i].disabled = isDisabled;
    }
  };

  var setAddress = function (element) {
    var coordinate = window.pin.getPinMainCoordinate(element);
    var address = document.querySelector('#address');
    address.value = coordinate.x + ', ' + coordinate.y;
  };

  var validRoomNumber = function () {
    if (capacity.value === '0' && roomNumber.value !== '100') {
      capacity.setCustomValidity('Выберите количество гостей');
    } else if (roomNumber.value === '100' && capacity.value !== '0') {
      capacity.setCustomValidity('100 комнат не для гостей');
    } else if (capacity.value > roomNumber.value) {
      capacity.setCustomValidity(ERROR_MESSAGES['rooms' + roomNumber.value]);
    } else {
      capacity.setCustomValidity('');
    }
  };

  var validPriceHousing = function (evt) {
    var housingValue = evt.target.value;
    price.min = MIN_PRICES[housingValue];
    price.placeholder = MIN_PRICES[housingValue];
  };

  var validTimesField = function (evt) {
    var timeValue = evt.target.value;
    timeIn.value = timeValue;
    timeOut.value = timeValue;
  };

  var setMinPrice = function () {
    price.min = MIN_PRICES[typeHousingValue];
    price.placeholder = MIN_PRICES[typeHousingValue];
  };

  setMinPrice(typeHousing);

  roomNumber.addEventListener('change', validRoomNumber);

  capacity.addEventListener('change', validRoomNumber);

  typeHousing.addEventListener('change', validPriceHousing);

  timeIn.addEventListener('change', validTimesField);

  timeOut.addEventListener('change', validTimesField);


  window.form = {
    stateFormField: stateFormField,
    adForm: adForm,
    setAddress: setAddress
  };
})();

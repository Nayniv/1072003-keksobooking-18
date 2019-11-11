'use strict';

(function () {
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
  var adForm = document.querySelector('.ad-form');
  var capacity = adForm.querySelector('#capacity');
  var roomNumber = adForm.querySelector('#room_number');
  var price = adForm.querySelector('#price');
  var typeHousing = adForm.querySelector('#type');
  var typeHousingValue = typeHousing.options[typeHousing.selectedIndex].value;
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');

  var stateField = function (element, isDisabled) {
    var fieldForm = element.querySelectorAll('fieldset, select');

    fieldForm.forEach(function (field) {
      field.disabled = isDisabled;
    });
  };

  var setAddress = function () {
    var coordinate = window.pin.getMainCoordinate();
    var address = document.querySelector('#address');
    address.value = coordinate.x + ', ' + coordinate.y;
  };

  var checkRoomNumberHandler = function () {
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

  var setMinPrice = function (elementValue) {
    price.min = MIN_PRICES[elementValue];
    price.placeholder = MIN_PRICES[elementValue];
  };

  var checkPriceHousingHandler = function (evt) {
    var housingValue = evt.target.value;
    setMinPrice(housingValue);
  };

  var checkTimesFieldHandler = function (evt) {
    var timeValue = evt.target.value;
    timeIn.value = timeValue;
    timeOut.value = timeValue;
  };

  setMinPrice(typeHousingValue);

  roomNumber.addEventListener('change', checkRoomNumberHandler);

  capacity.addEventListener('change', checkRoomNumberHandler);

  typeHousing.addEventListener('change', checkPriceHousingHandler);

  timeIn.addEventListener('change', checkTimesFieldHandler);

  timeOut.addEventListener('change', checkTimesFieldHandler);

  window.form = {
    stateField: stateField,
    ad: adForm,
    setAddress: setAddress
  };
})();

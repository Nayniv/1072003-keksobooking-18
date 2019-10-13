'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var capacity = adForm.querySelector('#capacity');
  var roomNumber = adForm.querySelector('#room_number');
  var ERROR_MESSAGES = {
    rooms1: '1 комната — для 1 гостя',
    rooms2: '2 комнаты — для 2 гостей или для 1 гостя',
    rooms3: '3 комнаты — для 3 гостей, для 2 гостей или для 1 гостя',
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

  var customValidation = function () {
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

  roomNumber.addEventListener('change', customValidation);

  capacity.addEventListener('change', customValidation);

  window.form = {
    stateFormField: stateFormField,
    adForm: adForm,
    setAddress: setAddress
  };
})();

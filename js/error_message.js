'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content;

  var show = function (message) {
    var error = errorTemplate.cloneNode(true);
    error.querySelector('.error__message').textContent = message;

    return error;
  };

  var close = function (buttonErrorClickHandler, buttonErrorKeydownHandler) { // что-то не так... но работает
    document.querySelector('.error').remove();
    document.removeEventListener('mousedown', buttonErrorClickHandler);
    document.removeEventListener('keydown', buttonErrorKeydownHandler);
  };

  window.errorMessage = {
    show: show,
    close: close
  };
})();

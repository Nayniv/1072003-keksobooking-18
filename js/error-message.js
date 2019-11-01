'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content;

  var buttonErrorClickHandler = function () {
    close();
  };

  var buttonErrorKeydownHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      close();
    }
  };

  var show = function (message) {
    var error = errorTemplate.cloneNode(true);
    error.querySelector('.error__message').textContent = message;

    error.querySelector('.error__button').addEventListener('click', buttonErrorClickHandler);
    error.querySelector('.error__button').removeEventListener('mousedown', buttonErrorClickHandler);
    document.addEventListener('keydown', buttonErrorKeydownHandler);

    return error;
  };

  var close = function () {
    document.removeEventListener('mousedown', buttonErrorClickHandler);
    document.removeEventListener('keydown', buttonErrorKeydownHandler);
    document.querySelector('.error').remove();
  };

  window.errorMessage = {
    show: show,
    close: close
  };
})();

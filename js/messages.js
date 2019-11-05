'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content;
  var successTemplate = document.querySelector('#success').content;

  var buttonErrorClickHandler = function () {
    close();
  };

  var buttonErrorKeydownHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      close();
    }
  };

  var successClickHandler = function () {
    close();
  };

  var successKeydownHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      close();
    }
  };

  var showError = function (message) {
    var error = errorTemplate.cloneNode(true);
    error.querySelector('.error__message').textContent = message;

    error.querySelector('.error__button').addEventListener('click', buttonErrorClickHandler);
    document.addEventListener('keydown', buttonErrorKeydownHandler);

    return error;
  };

  var showSucces = function () {
    var success = successTemplate.cloneNode(true);

    document.addEventListener('click', successClickHandler);
    document.addEventListener('keydown', successKeydownHandler);
    return success;
  };

  var close = function () {
    var error = document.querySelector('.error');
    var success = document.querySelector('.success');
    if (error) {
      error.querySelector('.error__button').removeEventListener('click', buttonErrorClickHandler);
      document.removeEventListener('keydown', buttonErrorKeydownHandler);
      document.querySelector('.error').remove();
    } else if (success) {
      document.removeEventListener('click', buttonErrorClickHandler);
      document.removeEventListener('keydown', buttonErrorKeydownHandler);
      document.querySelector('.success').remove();
    }
  };

  window.messages = {
    showError: showError,
    showSucces: showSucces,
    close: close
  };
})();

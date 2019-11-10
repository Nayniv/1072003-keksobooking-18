'use strict';

(function () {
  var FILE_EXTENSIONS = ['gif', 'jpg', 'jpeg', 'png'];
  var PREVIEW_WIDTH = 40;
  var PREVIEW_HEIGHT = 44;

  var checkExtension = function (fileName) {
    return FILE_EXTENSIONS.some(function (extension) {
      return fileName.endsWith(extension);
    });
  };

  var addImage = function (fileChooser, isPreview, preview) {
    var file = fileChooser.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();

      if (checkExtension(fileName)) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          if (isPreview) {
            preview.src = reader.result;
          } else {
            var newPreview = document.createElement('img');
            newPreview.src = reader.result;
            newPreview.width = PREVIEW_WIDTH;
            newPreview.height = PREVIEW_HEIGHT;
            newPreview.style = 'object-fit: cover;';
            newPreview.alt = 'Превью';
            preview.appendChild(newPreview);
          }
        });

        reader.readAsDataURL(file);
      }
    }
  };

  var removeImages = function (сontainer) {
    var images = сontainer.querySelectorAll('img');
    for (var i = 0; i < images.length; i++) {
      сontainer.removeChild(images[i]);
    }
  };

  window.fileUpload = {
    add: addImage,
    remove: removeImages
  };
})();

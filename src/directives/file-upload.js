import angular from 'angular';

fileUploadDirective.$inject = ['$timeout'];
function fileUploadDirective($timeout) {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: true,
    priority: 500,
    link: function(scope, element, attrs, ngModel) {
      scope.ngModel = ngModel;
      scope.file = undefined;
      scope.hasFile = false;
      scope.fileName = undefined;

      // Used to trigger the click() event on the hidden file input field.
      scope.fileInput = element[0].querySelector('.file-upload-field');

      scope.validateField = function(value) {
        if (value === null || value === undefined || value.trim().length === 0) {
          if (scope.form.required) {
            // 302 is the error code for required
            ngModel.$setValidity('tv4-302', false);
          }
        }
      }

      // Since we are not using the sf-validate directive, we need
      // to manually listen for the validate event and call our validation
      // function. This basically just applies the required validator.
      scope.$on('schemaFormValidate', function() {
        scope.validateField(ngModel.$viewValue);
      });

      var validateFile = function(file) {
        var valid = true;
        var schema = scope.$eval(attrs.fileUpload).schema;

        if (file.size > parseInt(schema.maxSize, 10)) {
          valid = false;
          ngModel.$setValidity('maxFileUploadSize', false);
        } else {
          ngModel.$setValidity('maxFileUploadSize', true);
        }

        if (file.size < parseInt(schema.minSize, 10)) {
          valid = false;
          ngModel.$setValidity('minFileUploadSize', false);
        } else {
          ngModel.$setValidity('minFileUploadSize', true);
        }

        scope.$apply();

        return valid;
      }

      var getFile = function(file) {

        // Reset all errors so we start with a clean slate
        Object.keys(ngModel.$error).forEach(function(k) {
          ngModel.$setValidity(k, true);
        });

        if(!file) {
          return;
        }

        if(!validateFile(file)) {
          return;
        }

        var reader = new FileReader();

        scope.file = file;
        scope.fileName = file.name;
        scope.hasFile = true;
        scope.file.ext = file.name.split('.').slice(-1)[0];
        scope.file.src = URL.createObjectURL(file);

        reader.onloadstart = function(e) {
          $timeout(function() {
            scope.loadingFile = true;
          }, 0);
        }

        reader.onload = function(e) {
          $timeout(function() {
            scope.loadingFile = false;
          }, 0);

          ngModel.$setViewValue(e.target.result);
        };

        reader.readAsDataURL(file);
        scope.$apply();
      };

      scope.removeFile = function(e) {
        e.preventDefault();
        e.stopPropagation();
        scope.file = undefined;
        scope.hasFile = false;
        scope.fileName = undefined;
        ngModel.$setViewValue(undefined);
      }

      angular.element(scope.fileInput).bind('change', function(e) {
        getFile(e.target.files[0]);
      });

    }
  }
}

function formatFileSize(size) {
  var sizeToReturn = undefined;
  if (angular.isDefined(size) && size !== null) {
    var formattedSize = undefined;
    var sizeType = undefined;
    if (size > 1024 * 1024 * 1024) {
      formattedSize = (((size / 1024) / 1024) / 1024).toFixed(1);
      sizeType = 'GB';
    } else if (size > 1024 * 1024) {
      formattedSize = ((size / 1024) / 1024).toFixed(1);
      sizeType = 'MB';
    } else if (size > 1024 * 1024) {
      formattedSize = (size / 1024).toFixed(1);
      sizeType = 'KB';
    } else {
      formattedSize = size
      sizeType = 'B';
    }
    sizeToReturn = formattedSize + ' ' + sizeType;
  }
  return sizeToReturn;
}

export { fileUploadDirective, formatFileSize };

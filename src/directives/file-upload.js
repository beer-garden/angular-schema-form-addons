import angular from 'angular';

fileUploadDirective.$inject = ['$timeout'];

class FileUploader{
  constructor(){
    this.chunkSize = 255 * 1024;
    this.file_name = null;

    console.log("Built the FileUploader!");
  }

  readBlob(blob){
    return this.reader.readAsDataURL(blob);
  }

  buildRequest(offset){
    console.log("Called the buildRequest!");
    console.log("@buildRequest " + this.file_name);
    var reader = new FileReader();

    reader.onload = (e) => {
      var http = new XMLHttpRequest();
      var url = 'http://localhost:8080/api/v1/files/?file_name='+this.file_name;
      var params = 'data='+e.target.result+'&offset='+(offset);
      http.open('POST', url, true);

      //Send the proper header information along with the request
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      http.send(params);
    }

    var chunk = this.file.slice( offset, offset + this.chunkSize );
    reader.readAsDataURL(chunk);
  }

  uploadFile(file){
    console.log("Called the buildRequest!");
    this.file = file;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        this.file_name = xhr.response;
        console.log(this.file_name);
        for( let offset = 0; offset < this.file.size; offset += this.chunkSize ){
          this.buildRequest(offset);
        }
      }
    }
    xhr.open('GET', 'http://localhost:8080/api/v1/files/id/?', true);
    xhr.send('');
  }
}

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

        var f_up = new FileUploader();

//        var reader = new FileReader();
//
        scope.file = file;
        scope.fileName = file.name;
        scope.hasFile = true;
        scope.file.ext = file.name.split('.').slice(-1)[0];
//        scope.file.src = URL.createObjectURL(file);
//
//        reader.onloadstart = function(e) {
//          $timeout(function() {
//            scope.loadingFile = true;
//          }, 0);
//        }
//
//        reader.onload = function(e) {
//          $timeout(function() {
//            scope.loadingFile = false;
//          }, 0);

          f_up.uploadFile(file);

          var prefix = 'file:' + file.name;
          ngModel.$setViewValue(prefix); // + e.target.result);
//        };

//        reader.readAsDataURL(file);
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

import angular from 'angular';

fileUploadDirective.$inject = ['$timeout'];

class FileUploader{
  constructor(){
    this.chunkSize = 255 * 1024;
    this.file_name = null;
  }

  readBlob(blob){
    return this.reader.readAsDataURL(blob);
  }

  buildRequest(offset, retries){
    var reader = new FileReader();

    reader.onload = (e) => {
      var http = new XMLHttpRequest();
      var url = 'http://localhost:8080/api/v1/files/?file_id='+this.file_name;
      var params = {'data': e.target.result.split(",")[1], 'offset': offset};
      http.open('POST', url, true);


      http.onreadystatechange = () => {
        if (http.readyState === 4) {
          if (http.status == 200){
            this.chunks_complete++;
            if (this.chunks_complete >= this.num_chunks){
              alert("File upload complete!");
            }
          }
          else if (retries > 0){
            this.buildRequest(offset, retries-1);
          }
          else if (!this.failed){
            this.failed = true;
            alert("File upload failed!");
          }
        }
      }

      //Send the proper header information along with the request
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      http.send(JSON.stringify(params));
    }

    var chunk = this.file.slice( offset*this.chunkSize, offset*this.chunkSize + this.chunkSize );
    reader.readAsDataURL(chunk);
  }

  uploadFile(file, ngModel, scope){
    this.file = file;
    this.num_chunks = Math.ceil(file.size/this.chunkSize);
    this.chunks_complete = 0;
    this.failed = false;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        var response = JSON.parse(xhr.response);
        if ('id' in response) {
          this.file_name = response['id'];
          ngModel.$setViewValue("BGFileID: "+this.file_name);
          scope.file_id = this.file_name;
          scope.$apply();
          for( let offset = 0; offset < this.file.size; offset += this.chunkSize ){
            this.buildRequest(Math.ceil(offset/this.chunkSize), 2);
          }
        }
        else {
          alert('Could not retrieve a FileID for upload, message: ' + response['message']);
        }
      }
    }
    var url = 'http://localhost:8080/api/v1/files/id/?file_name='+encodeURIComponent(file.name) +
            '&file_size='+ (this.file.size) + '&chunk_size=' + (this.chunkSize);
    xhr.open('GET', url, true);
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
        if(confirm("Would you like to upload this file? You will be alerted when the upload is complete.")){
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

            scope.file = file;
            scope.fileName = file.name;
            scope.hasFile = true;
            scope.file.ext = file.name.split('.').slice(-1)[0];
            scope.file_id = undefined;
            f_up.uploadFile(file, ngModel, scope);
        }
      }

      scope.removeFile = function(e) {
        var http = new XMLHttpRequest();
        var url = 'http://localhost:8080/api/v1/files/?file_id='+scope.file_id;
        http.open('DELETE', url, true);
        http.send('');

        e.preventDefault();
        e.stopPropagation();
        scope.file = undefined;
        scope.hasFile = false;
        scope.fileName = undefined;
        scope.file_id = undefined;
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

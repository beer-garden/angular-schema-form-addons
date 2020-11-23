import angular from 'angular';

fileUploadDirective.$inject = ['$timeout'];

class FileUploader{
  constructor(){
    this.file = null;
    this.numChunks = 0;
    this.failed = false;
    this.fileName = null;
    this.fileValid = false;
    this.chunksComplete = 0;
    this.chunkSize = 255 * 1024;
    this.api_path = '/api/v1/files/';
    // Tricky stuff to parse out the host information
    var a = document.createElement('a');
    a.href = document.baseURI;
    this.host = 'http://' + a.host;
  }

  reset(scope) {
    // Have to do this first to avoid divide by zero (checks the numChunks field)
    this.updateProgressBar(scope, 0);
    // The normal reset routine
    this.file = null;
    this.numChunks = 0;
    this.failed = false;
    this.fileName = null;
    this.fileValid = false;
    this.chunksComplete = 0;
    this.setVisible(scope.fileFailed, false, "", true);
    this.setVisible(scope.fileCompleted, false, "", true);
  }

  setVisible(object, visible, msg="", reset = false){
    if (visible) {
      object.setAttribute('style', 'visibility: visible');
      if ((msg != "" && msg != null) || reset)
        object.setAttribute('title', msg);
    }
    else {
      object.setAttribute('style', 'visibility: hidden');
      if ((msg != "" && msg != null) || reset)
        object.setAttribute('Title', msg);
    }
  }

  updateProgressBar(scope, number){
    scope.fileProgressBar.setAttribute('value', Math.ceil((number / this.numChunks)*100));
  }

  checkFileStatus(scope){
      var http = new XMLHttpRequest();
      // TODO - Make sure that we figure out the localhost proxy issue
      var url = this.host + this.api_path + '?file_id='+this.fileName+'&verify=true';
//      console.log("trying to get url: " + url);
      http.open('GET', url, true);

      http.onreadystatechange = () => {
        if (http.readyState === 4) {
          var response = JSON.parse(http.response);
          if ('valid' in response) {
            // Convert the value to a boolean
            this.fileValid = !!response['valid'];
            if (this.fileValid) {
              this.setVisible(scope.fileCompleted, true, response['message']);
            }
            else {
              this.setVisible(scope.fileFailed, true, response['message']);
            }
          }
          else {
            this.setVisible(scope.fileFailed, true, response['message']);
          }
        }
      }
      http.send('');
  }


  buildRequest(scope, offset, retries){
    var reader = new FileReader();

    reader.onload = (e) => {
      var http = new XMLHttpRequest();
      // TODO - Make sure that we figure out the localhost proxy issue
      var url = this.host + this.api_path + '?file_id='+this.fileName;
//      console.log("trying to get url: " + url);
      var params = {'data': e.target.result.split(",")[1], 'offset': offset};
      http.open('POST', url, true);


      http.onreadystatechange = () => {
        if (http.readyState === 4) {
          if (http.status == 200){
            this.chunksComplete++;
            this.updateProgressBar(scope, this.chunksComplete);
            if (this.chunksComplete >= this.numChunks && !this.failed){
                this.checkFileStatus(scope);
            }
          }
          else if (retries > 0){
            this.buildRequest(offset, retries-1);
          }
          else if (!this.failed){
            this.failed = true;
            this.setVisible(scope.fileFailed, true, ('File upload failed; tried to send chunk: ' + offset + ' too many times.'));
            this.fileValid = false;
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
    this.numChunks = Math.ceil(file.size/this.chunkSize);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status == 200) {
//        console.log("Received response: " + xhr.response);
        var response = JSON.parse(xhr.response);
        if ('file_id' in response) {
          this.fileName = response['file_id'];
          ngModel.$setViewValue(this.fileName);
          scope.$apply();
          for( let offset = 0; offset < this.file.size; offset += this.chunkSize ){
            this.buildRequest(scope, Math.ceil(offset/this.chunkSize), 2);
          }
        }
        else {
            this.setVisible(scope.fileFailed, true, ('File upload failed; could not retrieve a FileID for upload, message: ' + response['message']));
            this.fileValid = false;
        }
      }
    }

    // TODO - Make sure that we figure out the localhost proxy issue
    var url = this.host  + this.api_path + 'id/?file_name='+encodeURIComponent(file.name) + '&file_size='+ (this.file.size) + '&chunk_size=' + (this.chunkSize);
//    console.log("trying to get url: " + url);
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
      scope.hasFile = false;
      scope.file = undefined;
      scope.ngModel = ngModel;
      scope.fileName = undefined;
      scope.fileUploader = new FileUploader();

      // Used to trigger the click() event on the hidden file input field.
      scope.fileInput = element[0].querySelector('.file-upload-field');
      scope.fileProgressBar = element[0].querySelector('.file-upload-progress-bar');
      scope.fileCompleted = element[0].querySelector('.file-upload-completed');
      scope.fileFailed = element[0].querySelector('.file-upload-failed');


      scope.validateField = function(value) {
        if (value === null || value === undefined || value.trim().length === 0) {
          if (scope.form.required && !scope.fileUploader.fileValid) {
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
        if(confirm("Would you like to upload this file?")){
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

            scope.file = file;
            scope.fileName = file.name;
            scope.hasFile = true;
            scope.file.ext = file.name.split('.').slice(-1)[0];
            scope.fileUploader.uploadFile(file, ngModel, scope);
        }
      }

      scope.removeFile = function(e) {
        // TODO - Make sure that we figure out the localhost proxy issue
        var http = new XMLHttpRequest();
        var url = scope.fileUploader.host + scope.fileUploader.api_path + '?file_id='+scope.fileUploader.fileName;
        http.open('DELETE', url, true);
        http.send('');

        e.preventDefault();
        e.stopPropagation();
        scope.file = undefined;
        scope.hasFile = false;
        scope.fileName = undefined;
        scope.fileUploader.reset(scope);
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

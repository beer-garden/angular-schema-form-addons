fileUploadBytesDirective.$inject = ['$rootScope'];
function fileUploadBytesDirective($rootScope) {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: true,
    link: function(scope, element, attrs, ngModel) {

      scope.ngModel = ngModel;
      scope.key = ngModel.$$scope.getKey()[ngModel.$$scope.getKey().length-1];
      scope.fileInput = element[0].querySelector('.file-upload-field');
      scope.inputText = "No File Chosen";
      scope.fileName = null

      scope.selectedFile = function () {
        let file = document.getElementById(scope.key).files[0];
        if (file) {
          scope.fileName = file.name;
        } else {
          scope.fileName = null;
        }
        scope.validateValue();
        scope.$apply();
      }

      scope.validateValue = function () {
        Object.keys(ngModel.$error).forEach(function(k) {
          ngModel.$setValidity(k, true);
        });
        if (!document.getElementById(scope.key).files[0] && ngModel.$$scope.form.required && !ngModel.$modelValue) {
          ngModel.$setValidity('tv4-302', false);
        }
      }
      
      scope.$on('schemaFormValidate', function() {
        scope.validateValue();
      })
    }
  }
}

export { fileUploadBytesDirective };

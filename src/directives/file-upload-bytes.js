fileUploadBytesDirective.$inject = ["$rootScope"];

function fileUploadBytesDirective($rootScope) {
  return {
    restrict: "A",
    require: "ngModel",
    scope: true,
    link: function (scope, element, attrs, ngModel) {
      scope.ngModel = ngModel;
      scope.key = ngModel.$$scope.getKey()[ngModel.$$scope.getKey().length - 1];
      scope.fileInput = element[0].querySelector(".file-upload-field");
      scope.fileName = null;
      scope.hasFile = false;

      scope.selectedFile = function () {
        let file = document.getElementById(scope.key).files[0];
        if (file) {
          scope.fileName = file.name;
          scope.hasFile = true;
        } else {
          scope.fileName = null;
          scope.hasFile = false;
        }
        scope.validateValue();
        scope.$apply();
      };

      scope.removeFile = function () {
        document.getElementById(scope.key).value = "";
        scope.hasFile = false;
        scope.fileName = null;
        scope.validateValue();
      };

      scope.validateValue = function () {
        if (
          !scope.hasFile &&
          ngModel.$$scope.form.required &&
          !ngModel.$modelValue
        ) {
          ngModel.$setValidity("tv4-302", false);
        } else {
          ngModel.$setValidity("tv4-302", true);
        }
      };

      scope.$on("schemaFormValidate", function () {
        scope.validateValue();
      });
    },
  };
}

export { fileUploadBytesDirective };

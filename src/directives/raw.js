import angular from "angular";

export function rawDirective() {
  return {
    restrict: "A",
    require: "ngModel",
    scope: true,
    priority: 500,
    link: function (scope, element, attrs, ngModel) {
      // We need the ngModelController in several places, most notably for errors. So we emit it up to the
      // decorator directive so it can be put on the right scope.
      // Basically, stuff doesn't work inside sfArray without this
      scope.$emit("schemaFormPropagateNgModelController", ngModel);

      // Make sure that the value is stringified so it can be displayed correctly
      ngModel.$formatters.push(function (value) {
        return angular.toJson(value);
      });

      ngModel.$parsers.unshift(function (value) {
        if (value === null || value === undefined || value.trim().length === 0)
          return null;

        value = value.trim();

        if (value.toLowerCase() === "null") return null;
        if (value.toLowerCase() === "true") return true;
        if (value.toLowerCase() === "false") return false;
        if (!isNaN(Number(value))) return Number(value);

        try {
          return JSON.parse(value);
        } catch (e) {
          return value;
        }
      });

      function parseSuccessfulOrEmpty(value) {
        return (
          ["object", "number", "boolean"].indexOf(typeof value) !== -1 ||
          value === null ||
          value === undefined
        );
      }

      ngModel.$validators["tv4-302"] = function (modelValue, viewValue) {
        return (
          !scope.form.required ||
          ngModel.$pristine ||
          (modelValue !== null && modelValue !== undefined)
        );
      };
      ngModel.$validators["badObject"] = function (modelValue, viewValue) {
        return (
          parseSuccessfulOrEmpty(modelValue) || !modelValue.startsWith("{")
        );
      };
      ngModel.$validators["badArray"] = function (modelValue, viewValue) {
        return (
          parseSuccessfulOrEmpty(modelValue) || !modelValue.startsWith("[")
        );
      };
      ngModel.$validators["badType"] = function (modelValue, viewValue) {
        return (
          parseSuccessfulOrEmpty(modelValue) ||
          viewValue.startsWith("{") ||
          viewValue.startsWith("[") ||
          (viewValue.startsWith('"') &&
            viewValue.endsWith('"') &&
            viewValue.length > 1)
        );
      };

      // Need to listen for the validate event
      scope.$on("schemaFormValidate", function () {
        ngModel.$setDirty();
        ngModel.$validate();
      });
    },
  };
}

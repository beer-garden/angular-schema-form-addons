
import angular from 'angular';

export function dictionaryDirective() {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: true,
    priority: 500,
    link: function(scope, element, attrs, ngModel) {

      // We need the ngModelController in several places, most notably for errors. So we emit it up to the
      // decorator directive so it can be put on the right scope.
      // Basically, stuff doesn't work inside sfArray without this
      scope.$emit('schemaFormPropagateNgModelController', ngModel);

      // Make sure that the value is stringified so it can be displayed correctly
      ngModel.$formatters.push(function(value) {
        return angular.isObject(value) ? angular.toJson(value) : value;
      });

      ngModel.$parsers.unshift(function(value) {
        if (value === null || value === undefined || value.trim().length === 0) return null;

        value = value.trim();

        if(value.indexOf('{') === 0) {
          try {
            return JSON.parse(value);
          } catch(e) { }
        }

        return value;
      });

      ngModel.$validators['tv4-302'] = function(modelValue, viewValue) {
        return !scope.form.required || ngModel.$pristine || (modelValue !== null && modelValue !== undefined);
      };
      ngModel.$validators['badObject'] = function(modelValue, viewValue) {
        return (typeof modelValue === 'object') || (typeof modelValue === 'undefined');
      };

      // Need to listen for the validate event
      scope.$on('schemaFormValidate', function() {
        ngModel.$setDirty();
        ngModel.$validate();
      });
    }
  };
}

// This is heavily based on the 'eonasdan-bootstrap-datetimepicker' package

import jquery from "jquery";
import moment from "moment";

dateTimeDirective.$inject = ["$timeout"];
export function dateTimeDirective($timeout) {
  return {
    restrict: "EA",
    require: "ngModel",
    scope: false,
    link: function ($scope, $element, $attrs, ngModel) {
      var dpElement = $element.parent().hasClass("input-group")
        ? $element.parent()
        : $element;

      // Set up some default options that can be overridden
      var options = Object.assign(
        {
          format: "MM/DD/YYYY hh:mm A",
          keepInvalid: true,
          showTodayButton: true,
          showClear: true,
        },
        $scope.form.options
      );

      // This thing is probably expensive - make sure we destroy it
      $scope.$on("$destroy", function () {
        dpElement.data("DateTimePicker").destroy();
      });

      ngModel.$parsers.unshift(function (value) {
        // We need to translate when the text field is manually changed
        if (typeof value === "string") {
          if (value.trim().length === 0) {
            return null;
          }

          var parsedMoment = moment(value, options["format"]);
          return parsedMoment.isValid() ? parsedMoment.valueOf() : value;
        }
        return value;
      });

      ngModel.$render = function () {
        // Make sure we clear the datepicker if there's no value
        if (!ngModel.$viewValue && dpElement.data("DateTimePicker").date()) {
          dpElement.data("DateTimePicker").clear();
        }
        // We have a value, we just need to give the datepicker a moment object
        else if (ngModel.$viewValue) {
          var viewMoment = moment.isMoment(ngModel.$viewValue)
            ? ngModel.$viewValue
            : moment(ngModel.$viewValue, "x");
          dpElement.data("DateTimePicker").date(viewMoment);
        }
      };

      // changeEvent contains the new and old moment objects (date and oldDate).
      // Date will be false if the date has been cleared, which we want to translate to null
      // Data.valueOf() will be NaN if the control couldn't parse the input (which means it's probably a string),
      // which we want to leave unchanged
      dpElement.on("dp.change", function (changeEvent) {
        var newValue =
          changeEvent.date === false ? null : changeEvent.date.valueOf();

        if (!Number.isNaN(newValue)) {
          ngModel.$setViewValue(newValue);
        }
      });

      dpElement.datetimepicker(options);
    },
  };
}

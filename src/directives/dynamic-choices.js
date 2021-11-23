/* Implementation of the dynamic choices capability

## Referencing other parameters
During init the choices definition is inspected to see if there are any
dependencies on other parameters (choices.dependsOn). If so, a watch is created
for each of them that will fire populateTitleMap whenever the referenced
parameter changes. The schema-form model will already be updated at this point
so we can just grab values from it like normal.

## Self-referring choices
If the choices for an element need to use the current value of the element
as an input parameter (self-referring), then that needs to be handled slightly
differently. The current $viewValue (the value type into the element) is already
passed to populateTitleMap, so we just have to use that instead.

*/

dynamicChoicesDirective.$inject = [
  "$http",
  "$q",
  "filterFilter",
  "sfPath",
  "sfSelect",
];
export function dynamicChoicesDirective(
  $http,
  $q,
  filterFilter,
  sfPath,
  sfSelect
) {
  return {
    restrict: "A",
    scope: false,
    priority: 400, // Must be <500 so number parser gets put in the correct place
    require: "ngModel",
    link: function (scope, element, attrs, ngModel) {
      var form = scope.form;
      form.titleMap = [];
      form.choices = form.choices || {};
      form.showSpinner = false;

      var formKey = form.key;
      var normalizedKey = sfPath.normalize(formKey);
      var selfReferring = false;

      if (!form.validationMessage) {
        form.validationMessage = {};
      }
      form.validationMessage["anyOf"] =
        "Value is not in list of allowed values";

      ngModel.$validators["anyOf"] = function (modelValue, viewValue) {
        if (!form.strict || modelValue === null || modelValue === undefined) {
          return true;
        }

        for (var i = 0; i < form.titleMap.length; i++) {
          if (modelValue === form.titleMap[i].value) {
            return true;
          }
        }
        return false;
      };

      // This is the 'required' validator
      ngModel.$validators["tv4-302"] = function (modelValue, viewValue) {
        return (
          !form.required || // We want to specifically disable this validator
          ngModel.$pristine || // User hasn't touched the control yet
          (modelValue !== null && modelValue !== undefined)
        );
      };

      function getItemDisplay() {
        for (var i = 0; i < form.titleMap.length; i++) {
          if (form.titleMap[i]["value"] == ngModel.$modelValue) {
            return form.titleMap[i]["name"];
          }
        }
        return ngModel.$viewValue;
      }

      // We need to update the render functions to handle the case where the item names and values differ.
      // I think the 'correct' way to do this is to use the getterSetter ngModel option, but I couldn't get it working.
      // Hooking into rendering also helps with displaying a newly-invalid value when the titleMap itself changes.
      var originalRender = ngModel.$render;
      if (attrs.hasOwnProperty("bsSelect")) {
        ngModel.$render = function () {
          originalRender();
          if (ngModel.$modelValue) {
            element[0].childNodes[0].nodeValue = getItemDisplay() + " ";
          }
        };

        // We also always want selects to default to strict
        if (form.strict === undefined || form.strict === null) {
          form.strict = true;
        }
      } else {
        ngModel.$render = function () {
          originalRender();
          if (ngModel.$modelValue) {
            element[0].value = getItemDisplay();
          }
        };

        // Typeaheads need to do some additional parsing and validating for number types
        if (
          form.schema.type.indexOf("integer") !== -1 ||
          form.schema.type.indexOf("number") !== -1
        ) {
          ngModel.$parsers.push(function (value) {
            // See the later parsing comment for why we do this here, but we have to always start as valid
            ngModel.$setValidity("tv4-0", true);

            if (value === undefined || value === null) {
              return value;
            }
            if (value === "") {
              return null;
            } // Because Number('') = 0 ... wtf

            // It would be nice to have a validator that does this, but ASF (schema-validate directive) does type
            // checking in the parsers pipeline, so WE have to do it in the parsers pipeline before they do.
            var valueNumber = Number(value);
            if (
              isNaN(valueNumber) ||
              (form.schema.type.indexOf("integer") !== -1 &&
                valueNumber != parseInt(value))
            ) {
              ngModel.$setValidity("tv4-0", false);
              return undefined;
            }

            return valueNumber;
          });
        }
      }

      function resolve(input, typeString) {
        if (typeof input === typeString) {
          return input;
        } else if (typeof input === "string") {
          var evaled = scope.$parent.evalExpr(input);
          if (typeof evaled === typeString) {
            return evaled;
          } else {
            throw (
              "A string must match the name of a " +
              typeString +
              " in the parent scope"
            );
          }
        }

        throw (
          typeString +
          " must be the name of a " +
          typeString +
          " in the parent scope or an actual " +
          typeString
        );
      }

      function populateTitleMap(viewValue) {
        // Show the spinner to indicate loading
        form.showSpinner = true;

        // Clear out existing error message
        form.fetchErrorMessage = undefined;

        // Invoke whatever method is specified to populate the titleMap
        var promise;
        if (form.choices.titleMap || form.choices.enum) {
          promise = $q.when(form.choices.titleMap || form.choices.enum);
        } else if (form.schema && "enum" in form.schema) {
          // ASF does additional verification on schema.enum - strings will work but objects won't
          if (
            form.schema.enum.length > 0 &&
            form.schema.enum[0] instanceof Object
          ) {
            console.warn(
              "Using an enum of Objects is not recommended, try using form.choices.titleMap instead"
            );
          }
          promise = $q.when(form.schema.enum);
        } else if (form.choices.callback) {
          var args = [];

          // Helper function to resolve argument values when creating the titleMap.
          // This is from https://github.com/beer-garden/beer-garden/issues/439 - we need
          // to use the viewValue in that case because the model hasn't been updated yet.
          function getArgValue(field) {
            if (sfPath.normalize(field) == normalizedKey) {
              return viewValue;
            } else {
              return sfSelect(field, scope.model);
            }
          }

          if (form.choices.callback.arguments) {
            if (!Array.isArray(form.choices.callback.arguments)) {
              form.choices.callback.arguments = [
                form.choices.callback.arguments,
              ];
            }
            args = Array.from(form.choices.callback.arguments);
          }

          if (form.choices.callback.argumentFields) {
            if (typeof form.choices.callback.argumentFields === "string") {
              form.choices.callback.argumentFields = [
                form.choices.callback.argumentFields,
              ];
            }
            for (
              var i = 0;
              i < form.choices.callback.argumentFields.length;
              i++
            ) {
              args.push(getArgValue(form.choices.callback.argumentFields[i]));
            }
          }

          // The callback function is going to be createRequestWrapper in the command
          // view controller. This is what lets us reach back up into the app to create
          // a request.
          promise = $q
            .when(
              resolve(form.choices.callback.function, "function").apply(
                null,
                args
              )
            )
            .then((response) => {
              // The BG request service resolves successfully regardless of the Request
              // completion status, so we need to deal with non-success statuses here.
              let parsed = JSON.parse(response.output);

              if (response.status == "SUCCESS") {
                return parsed;
              } else {
                throw parsed;
              }
            });
        } else if (form.choices.httpGet) {
          var modelParams = {};
          for (var key in form.choices.httpGet.queryParameterFields) {
            if (form.choices.httpGet.queryParameterFields.hasOwnProperty(key)) {
              modelParams[key] = getArgValue(
                form.choices.httpGet.queryParameterFields[key]
              );
            }
          }

          args = Object.assign(
            {},
            form.choices.httpGet.queryParameters,
            modelParams
          );

          promise = $http.get(form.choices.httpGet.url, { params: args }).then(
            function (response) {
              return response.data;
            },
            function (response) {
              throw { message: response.data, url: response.config.url };
            }
          );
        } else {
          promise = $q.reject({
            message: "No way to populate title map for " + form.key,
          });
        }

        return promise.then(
          function (response) {
            return finalizeTitleMap(response);
          },
          function (response) {
            handleError(response);
          }
        );
      }

      function finalizeTitleMap(data) {
        // We want to be able to transform the data before attempting to parse out the titleMap
        if (form.choices.transforms) {
          if (!Array.isArray(form.choices.transforms)) {
            form.choices.transforms = [form.choices.transforms];
          }

          for (var i = 0; i < form.choices.transforms.length; i++) {
            var transform = form.choices.transforms[i];

            if (transform === "keys") {
              data = Object.keys(data);
            } else if (transform === "fixNull") {
              // If there's already an element with the null value make sure it's at the front
              var nullItem = { value: null, text: "Select One" };

              for (var j = 0; j < data.length; j++) {
                if (data[j] === null) {
                  data.splice(j, 1);
                  break;
                } else if (
                  typeof data[j] === "object" &&
                  data[j]["value"] === null
                ) {
                  nullItem = data[j];
                  data.splice(j, 1);
                  break;
                }
              }
              data.unshift(nullItem);
            } else if (transform !== null && typeof transform === "object") {
              if (transform.lookup) {
                data = data[transform.lookup];
              } else if (transform.lookupField) {
                var keyValue = sfSelect(transform.lookupField, scope.model);

                if (keyValue === undefined) {
                  throw "No value for field " + transform.lookupField;
                }

                // Default to an empty array if the data has no attribute with the given keyValue
                data = data[keyValue] !== undefined ? data[keyValue] : [];
              }
            }
          }
        }

        // Now create the new titleMap
        // We want to support an array of objects (will allow specifying value, text, and category) or an array of
        // strings (text and value will be the string, and there won't be a category)
        var newTitleMap = [];
        for (var i = 0; i < data.length; i++) {
          if (data[i] instanceof Object) {
            newTitleMap.push({
              value: data[i]["value"],
              name: data[i]["text"]
                ? "" + data[i]["text"]
                : "" + data[i]["value"],
              category: data[i]["category"],
            });
          } else {
            newTitleMap.push({ name: "" + data[i], value: data[i] });
          }
        }

        // Also have some transforms that occur after titleMap creation
        if (form.choices.transforms) {
          for (var i = 0; i < form.choices.transforms.length; i++) {
            var transform = form.choices.transforms[i];

            if (transform !== null && typeof transform === "object") {
              if (transform.categoryField) {
                var category = sfSelect(transform.categoryField, scope.model);

                // The built-in Angular filter returns everything if the input is undefined which is not what we want
                newTitleMap =
                  category === undefined
                    ? []
                    : filterFilter(newTitleMap, { category: category });
              }
            }
          }
        }

        form.titleMap = newTitleMap;

        // All done loading so hide the the spinner
        form.showSpinner = false;

        // Make sure that current model is still valid with the new choices
        ngModel.$validate();

        return newTitleMap;
      }

      function handleError(response) {
        // All done loading so hide the the spinner
        form.showSpinner = false;

        if (response.message) {
          form.fetchErrorMessage = response.message;
        } else if (response.url) {
          form.fetchErrorMessage =
            "Couldn't populate choices from " + response.url;
        } else {
          form.fetchErrorMessage = response;
        }
      }

      // If this depends on other fields register a watch on each of them
      // The model isn't populated yet so actual values aren't ready
      if (form.choices.updateOn && form.choices.updateOn.length > 0) {
        function setupWatch(watchKey) {
          scope.$watch("model" + watchKey, function (newVal, oldVal) {
            // FYI - You might be tempted to put a if(newVal != oldVal) wrapper here.
            // That would be a mistake. We rely on this watch to kick off the initial
            // (on page load) populateTitleMap once all 'dependent' parameters are
            // initialized.
            populateTitleMap(ngModel.$viewValue).finally(function () {
              scope.$emit("sf-changed-titlemap", form.key);
            });
          });
        }

        if (typeof form.choices.updateOn === "string") {
          form.choices.updateOn = [form.choices.updateOn];
        }

        // Determine which fields we need to set watches on.
        // If one of those fields is THIS field, then we're in the self-referring case
        // and those changes will be handled by scope.getItems.
        // Any other fields will get a watch.
        for (var i = 0; i < form.choices.updateOn.length; i++) {
          // Make sure to only set a watch on OTHER fields
          let normalizedUpdate = sfPath.normalize(form.choices.updateOn[i]);
          if (normalizedUpdate != normalizedKey) {
            setupWatch(normalizedUpdate);
          } else {
            selfReferring = true;
          }
        }
      }
      // Otherwise go ahead and populate the title map
      else {
        populateTitleMap();
      }

      // We want to be selective about when we call populateTitleMap since it can be
      // expensive. This function is called every time the viewValue changes (a
      // character is typed) but only choices that are self-referring need to
      // re-populate the map for those changes. For "normal" parameters we can just
      // use the current titleMap.
      //
      // Also, even for self-referring parameters we don't want to re-populate if the
      // viewValue hasn't actually changed, as that would be pointless.
      scope.getItems = function (viewValue) {
        if (selfReferring && viewValue != ngModel.$modelValue) {
          return populateTitleMap(viewValue);
        }

        return form.titleMap;
      };

      // Sigh. Ok, this is terrible. This is for the pour-it-again case where
      // a model value was set directly. This does a couple of things:
      // 1. Sets the view value to kick the typeahead dropdown population
      // 2. Re-renders so the view value shows up in the text box
      // 3. Blurs the element to hide the dropdown
      let initialValue = sfSelect(normalizedKey, scope.model);
      if (initialValue && !attrs.hasOwnProperty("bsSelect")) {
        ngModel.$setViewValue(initialValue);
        ngModel.$render();
        $(element).blur();
      }
    },
  };
}

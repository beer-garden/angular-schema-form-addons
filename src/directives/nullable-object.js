import angular from "angular";

nullableObjectDirective.$inject = ["schemaForm", "sfSelect", "sfPath"];
export function nullableObjectDirective(schemaForm, sfSelect, sfPath) {
  return {
    restrict: "A",
    scope: false,
    priority: 500,
    link: function (scope, element, attrs) {
      scope.createObject = function ($event, formObj) {
        /*
        OK, quick explainer:
        We've already created the form elements and hidden them behind an
        ng-show. The model is determined by the combination of those form
        elements and the nullable-object's schema.properties. Since we 'hid'
        those properties into tempProperties in the postProcessFunction we
        can move them back into properties, then we just need to set the
        model according to the schema defaults.

        Where this breaks down is if the nullable-object has a nested array.
        SchemaForm does a lot of setup in the sfNewArray directive, which
        is fired when we create that form object. It sets a model value,
        which breaks us. To get around that we set 'startEmpty' to true on
        the array form. Unfortunately, the sfNewArray does a lot of stuff
        with watches, which makes it really difficult to just set startEmpty
        back to its original value and set the default (like we do for
        everything else). So if the nullable-object has a nested array we
        need to redraw the entire schemaForm.
        */

        // Copy the properties we saved off earlier back to the right place
        angular.copy(formObj.schema.tempProperties, formObj.schema.properties);
        delete formObj.schema.tempProperties;

        delete formObj.schema.format;
        if (formObj.schema.partition) {
          formObj.type = "partitioned-object";
          formObj.partition = formObj.schema.partition;
          formObj.accordionHeading = formObj.schema.accordionHeading;
        }

        // Reset array values
        var needRedraw = false;
        schemaForm.traverseForm(formObj, function (nestedFormObj) {
          if (nestedFormObj.type === "array") {
            needRedraw = true;
            nestedFormObj.startEmpty = nestedFormObj.tempStartEmpty;
            delete nestedFormObj.tempStartEmpty;
          }
          if (
            !needRedraw &&
            formObj.schema.partition &&
            nestedFormObj.schema.optional
          ) {
            needRedraw = true;
          }
        });

        // If we don't need to redraw we can just set the model to the defaults
        if (!needRedraw) {
          if (!scope.options || scope.options.setSchemaDefaults !== false) {
            schemaForm.traverseSchema(formObj.schema, function (prop, path) {
              if (angular.isDefined(prop["default"])) {
                var fullPath = sfPath.normalize(formObj.key.concat(path));
                var val = sfSelect(fullPath, scope.model);
                if (angular.isUndefined(val)) {
                  sfSelect(fullPath, scope.model, prop["default"]);
                }
              }
            });
          }
          formObj.created = true;
          scope.$emit("sf-changed");
        } else {
          formObj.created = true;
          scope.$emit("schemaFormRedraw");
        }
      };
    },
  };
}

nullableObjectPostProcessor.$inject = ["postProcess", "schemaForm"];
export function nullableObjectPostProcessor(postProcess, schemaForm) {
  var nullablePostProcess = function (canonicalForm) {
    // The canonicalForm is passed as an array, so we need to iterate over
    // each item and traverse down the children
    for (var i = 0; i < canonicalForm.length; i++) {
      schemaForm.traverseForm(canonicalForm[i], function (formObj) {
        // If a nullable-object hasn't been created save off the properties
        if (
          formObj.type === "nullable-object" &&
          !formObj.created &&
          !angular.equals({}, formObj.schema.properties)
        ) {
          formObj.schema.tempProperties = angular.copy(
            formObj.schema.properties
          );
          formObj.schema.properties = {};

          // If the nullable-object has array children, they need to start
          // empty so the model doesn't get populated
          schemaForm.traverseForm(formObj, function (nestedFormObj) {
            if (nestedFormObj.type === "array") {
              nestedFormObj.tempStartEmpty = nestedFormObj.startEmpty;
              nestedFormObj.startEmpty = true;
            }
          });
        }
      });
    }
    return canonicalForm;
  };

  postProcess.addPostProcess(nullablePostProcess);
}


import angular from 'angular';

dynamicChoicesDirective.$inject = ['$http', '$q', 'filterFilter', 'sfPath', 'sfSelect'];
export function dynamicChoicesDirective($http, $q, filterFilter, sfPath, sfSelect) {
  return {
    restrict: 'A',
    scope: false,
    priority: 400,      // Must be <500 so number parser gets put in the correct place
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      var form = scope.form;
      form.titleMap = [];
      form.choices = form.choices || {};

      if(!form.validationMessage) { form.validationMessage = {}; }
      form.validationMessage['anyOf'] = 'Value is not in list of allowed values';

      ngModel.$validators['anyOf'] = function(modelValue, viewValue) {
        if(!form.strict || modelValue === null || modelValue === undefined) {
          return true;
        }

        for(var i=0; i<form.titleMap.length; i++) {
          if(modelValue === form.titleMap[i].value) { return true; }
        }
        return false;
      };

      // This is the 'required' validator
      ngModel.$validators['tv4-302'] = function(modelValue, viewValue) {
        return !form.required       // We want to specifically disable this validator
          || ngModel.$pristine      // User hasn't touched the control yet
          || (modelValue !== null && modelValue !== undefined);
      };

      function getItemDisplay() {
        for(var i=0; i<form.titleMap.length; i++){
          if(form.titleMap[i]['value'] == ngModel.$modelValue) {
            return form.titleMap[i]['name'];
          }
        }
        return ngModel.$viewValue;
      }

      // We need to update the render functions to handle the case where the item names and values differ.
      // I think the 'correct' way to do this is to use the getterSetter ngModel option, but I couldn't get it working.
      // Hooking into rendering also helps with displaying a newly-invalid value when the titleMap itself changes.
      var originalRender = ngModel.$render;
      if(attrs.hasOwnProperty('bsSelect')){
        ngModel.$render = function() {
          originalRender();
          if(ngModel.$modelValue) {
            element[0].childNodes[0].nodeValue = getItemDisplay() + ' ';
          }
        };

        // We also always want selects to default to strict
        if(form.strict === undefined || form.strict === null){
          form.strict = true;
        }
      }
      else {
        ngModel.$render = function() {
          originalRender();
          if(ngModel.$modelValue) {
            element[0].value = getItemDisplay();
          }
        };

        // Typeaheads need to do some additional parsing and validtating for number types
        if(form.schema.type.indexOf('integer') !== -1 || form.schema.type.indexOf('number') !== -1) {
          ngModel.$parsers.push(function(value) {
            // See the later parsing comment for why we do this here, but we have to always start as valid
            ngModel.$setValidity('tv4-0', true);

            if(value === undefined || value === null) { return value; }
            if(value === '') { return null; } // Because Number('') = 0 ... wtf

            // It would be nice to have a validator that does this, but ASF (schema-validate directive) does type
            // checking in the parsers pipeline, so WE have to do it in the parsers pipeline before they do.
            var valueNumber = Number(value);
            if( isNaN(valueNumber) ||
                (form.schema.type.indexOf('integer') !== -1 && (valueNumber != parseInt(value)))) {
              ngModel.$setValidity('tv4-0', false);
              return undefined;
            }

            return valueNumber;
          });
        }
      }

      function resolve(input, typeString) {
        if( typeof input === typeString ) {
          return input;
        }
        else if( typeof input === 'string' ) {
          var evaled = scope.$parent.evalExpr(input);
          if(typeof evaled === typeString) {
            return evaled;
          }
          else {
            throw 'A string must match the name of a ' + typeString + ' in the parent scope';
          }
        }

        throw typeString + ' must be the name of a ' + typeString + ' in the parent scope or an actual ' + typeString;
      }

      function populateTitleMap() {

        // Invoke whatever method is specified to populate the titleMap
        var promise;
        if(form.choices.titleMap || form.choices.enum) {
          promise = $q.when(form.choices.titleMap || form.choices.enum);
        }

        else if(form.schema && "enum" in form.schema) {
          // ASF does additional verification on schema.enum - strings will work but objects won't
          if(form.schema.enum.length > 0 && form.schema.enum[0] instanceof Object) {
            console.warn("Using an enum of Objects is not recommended, try using form.choices.titleMap instead");
          }
          promise = $q.when(form.schema.enum);
        }

        else if(form.choices.callback) {
          var args = [];

          if(form.choices.callback.arguments) {
            if(!Array.isArray(form.choices.callback.arguments)) {
              form.choices.callback.arguments = [form.choices.callback.arguments];
            }
            args = Array.from(form.choices.callback.arguments);
          }

          if(form.choices.callback.argumentFields) {
            if(typeof form.choices.callback.argumentFields === "string" ) {
              form.choices.callback.argumentFields = [form.choices.callback.argumentFields];
            }
            for(var i=0; i<form.choices.callback.argumentFields.length; i++) {
              args.push( sfSelect(form.choices.callback.argumentFields[i], scope.model) );
            }
          }

          promise = $q.when( resolve(form.choices.callback.function, 'function').apply(null, args) );
        }

        else if(form.choices.httpGet) {
          var modelParams = {};
          for(var key in form.choices.httpGet.queryParameterFields) {
            if(form.choices.httpGet.queryParameterFields.hasOwnProperty(key)) {
              modelParams[key] = sfSelect(form.choices.httpGet.queryParameterFields[key], scope.model);
            }
          }

          args = Object.assign({}, form.choices.httpGet.queryParameters, modelParams);

          promise = $http.get(form.choices.httpGet.url, {params: args}).then(
            function(response) { return response.data; },
            function(response) { throw {message: response.data, url: response.config.url}; }
          );
        }

        else {
          promise = $q.reject({message: "No way to popluate title map for " + form.key});
        }

        return promise.then(
          function(response) { finalizeTitleMap(response); },
          function(response) { handleError(response); }
        );
      }

      function finalizeTitleMap(data) {

        // We want to be able to transform the data before attempting to parse out the titleMap
        if(form.choices.transforms) {
          if(!Array.isArray(form.choices.transforms)) {
            form.choices.transforms = [form.choices.transforms];
          }

          for(var i=0; i<form.choices.transforms.length; i++) {
            var transform = form.choices.transforms[i];

            if(transform === 'keys') {
              data = Object.keys(data);
            }
            else if(transform === 'fixNull') {
              // If there's already an element with the null value make sure it's at the front
              var nullItem = {value: null, text: 'Select One'};

              for(var j=0; j<data.length; j++) {
                if(data[j] === null) {
                  data.splice(j, 1);
                  break;
                }
                else if(typeof data[j] === 'object' && data[j]['value'] === null) {
                  nullItem = data[j];
                  data.splice(j, 1);
                  break;
                }
              }
              data.unshift(nullItem);
            }
            else if(transform !== null && typeof transform === 'object') {
              if(transform.lookup) {
                data = data[transform.lookup];
              }
              else if(transform.lookupField) {
                var keyValue = sfSelect(transform.lookupField, scope.model);

                if(keyValue === undefined) {
                  throw 'No value for field ' + transform.lookupField;
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
        for(var i=0; i<data.length; i++) {
          if(data[i] instanceof Object) {
            newTitleMap.push({
              value: data[i]['value'],
              name: data[i]['text'] ? ''+data[i]['text'] : ''+data[i]['value'],
              category: data[i]['category']
            });
          }
          else {
            newTitleMap.push({name: ''+data[i], value: data[i]});
          }
        }

        // Also have some transforms that occur after titleMap creation
        if(form.choices.transforms) {
          for(var i=0; i<form.choices.transforms.length; i++) {
            var transform = form.choices.transforms[i];

            if(transform !== null && typeof transform === 'object') {
              if(transform.categoryField) {
                var category = sfSelect(transform.categoryField, scope.model);

                // The built-in Angular filter returns everything if the input is undefined which is not what we want
                newTitleMap = category === undefined ? [] : filterFilter(newTitleMap, {category: category});
              }
            }
          }
        }

        form.titleMap = newTitleMap;

        // Make sure that current model is still valid with the new choices
        ngModel.$validate();
      }

      function handleError(response) {
        form.fetchErrorMessage = response.message ? response.message : "Couldn't populate choices from " + response.url;
      }

      // If this depends on other fields register a watch on each of them
      // The model isn't populated yet so actual values aren't ready
      if(form.choices.updateOn && form.choices.updateOn.length > 0) {

        function setupWatch(watchKey) {
          scope.$watch('model' + watchKey, function(newVal, oldVal) {
            populateTitleMap().finally(
              function() {scope.$emit('sf-changed-titlemap', form.key);}
            );
          });
        }

        if(typeof form.choices.updateOn === "string" ) {
          form.choices.updateOn = [form.choices.updateOn];
        }

        for(var i=0; i<form.choices.updateOn.length; i++) {
          setupWatch(sfPath.normalize(form.choices.updateOn[i]));
        }
      }

      // Otherwise go ahead and popluate the title map
      else {
        populateTitleMap();
      }
    }
  };
}

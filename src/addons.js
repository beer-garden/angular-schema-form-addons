
import angular from 'angular';

import 'angular-ui-bootstrap';
import 'angular-schema-form-bootstrap';
import 'eonasdan-bootstrap-datetimepicker';
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css';

import { dynamicChoicesDirective } from './directives/dynamic-choices.js';
import { fileUploadDirective, formatFileSize } from './directives/file-upload';
import { rawDirective } from './directives/raw.js';
import { dictionaryDirective } from './directives/dictionary.js';
import { nullableObjectDirective, nullableObjectPostProcessor } from './directives/nullable-object.js';
import { partitionTransclusion } from './directives/partitioned-object.js';
import { dateTimeDirective } from './directives/datetime.js';

import arrayTemplate from './templates/array.html';
import accordionTemplate from './templates/accordion.html';
import fileUploadTemplate from './templates/file-upload.html';
import typeaheadTemplate from './templates/typeahead.html';
import selectTemplate from './templates/select.html';
import rawTemplate from './templates/raw.html';
import dictionaryTemplate from './templates/dictionary.html';
import partitionedObjectTemplate from './templates/partitioned-object.html';
import nullableObjectTemplate from './templates/nullable-object.html';
import datetimeTemplate from './templates/datetime.html';


angular.module('beer-garden.addons', ['schemaForm'])
  .provider('postProcess', postProcessProvider)
  .config(postProcessConfig)
  .config(errorMessageConfig)
  .config(addonsConfig)
  .directive('dynamicChoices', dynamicChoicesDirective)
  .directive('raw', rawDirective)
  .directive('dictionary', dictionaryDirective)
  .directive('nullableObject', nullableObjectDirective)
  .directive('fileUpload', fileUploadDirective)
  .directive('dateTime', dateTimeDirective)
  .run(nullableObjectPostProcessor);

addonsConfig.$inject = ['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfBuilderProvider', 'sfPathProvider'];
function addonsConfig(schemaFormProvider, schemaFormDecoratorsProvider, sfBuilderProvider, sfPathProvider) {

  // Alias these for brevity later
  var sfField         = sfBuilderProvider.builders.sfField;
  var transclusion    = sfBuilderProvider.builders.transclusion;
  var condition       = sfBuilderProvider.builders.condition;
  var ngModelOptions  = sfBuilderProvider.builders.ngModelOptions;
  var ngModel         = sfBuilderProvider.builders.ngModel;
  var array           = sfBuilderProvider.builders.array;
  var stdBuilders     = sfBuilderProvider.stdBuilders;

  // Define all the new addons
  schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator',
    'array', arrayTemplate, [ sfField, ngModelOptions, ngModel, array, condition ]);

  schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator',
    'base64file', fileUploadTemplate, stdBuilders);

  schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator',
    'accordion', accordionTemplate, [sfField, transclusion, condition]);

  schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator',
    'typeahead', typeaheadTemplate, stdBuilders);

  schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator',
    'select', selectTemplate, stdBuilders);

  schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator',
    'variant', rawTemplate, stdBuilders);

  schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator',
    'dictionary', dictionaryTemplate, stdBuilders);

  schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator',
    'partitioned-object', partitionedObjectTemplate, [ sfField, partitionTransclusion, condition ]);

  schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator',
    'nullable-object', nullableObjectTemplate, [ sfField, transclusion, condition ]);

  schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator',
    'datetime', datetimeTemplate, stdBuilders);

  // Helper function to verify schema types
  function verifyType(type, schemaType) {
    return (typeof(schemaType) === 'string' && schemaType === type) ||
           (Array.isArray(schemaType) && schemaType.indexOf(type) !== -1 );
  }

  // Now define and register rules for when these addons should be used
  var base64fileRule = function(name, schema, options) {
    if (verifyType('file', schema.type) && schema.format === 'base64') {
      var f = schemaFormProvider.stdFormObj(name, schema, options);
      f.key = options.path;
      f.type = 'base64file';
      f.validationMessage = {
        'maxFileUploadSize': "Max file size is " + formatFileSize(schema.maxSize),
        'minFileUploadSize': "Min file size is " + formatFileSize(schema.minSize)
      }
      options.lookup[sfPathProvider.stringify(options.path)] = f;
      return f;
    }
  }
  schemaFormProvider.prependRule('file', base64fileRule);

  var variantRule = function(name, schema, options) {
    if (verifyType('variant', schema.type)) {
      var f = schemaFormProvider.stdFormObj(name, schema, options);
      f.key = options.path;
      f.type = 'variant';
      f.validationMessage = {
        "badType" : "Unknown Type. Remember, variant fields must " +
        "be enclosed with {} (object), [] (array), or \"\" (string)."
      };
      options.lookup[sfPathProvider.stringify(options.path)] = f;
      return f;
    }
  };
  schemaFormProvider.prependRule('variant', variantRule);

  var dictionaryRule = function(name, schema, options) {
    if (verifyType('dictionary', schema.type)) {
      var f = schemaFormProvider.stdFormObj(name, schema, options);
      f.key = options.path;
      f.type = 'dictionary';
      options.lookup[sfPathProvider.stringify(options.path)] = f;
      return f;
    }
  };
  schemaFormProvider.prependRule('dictionary', dictionaryRule);

  var partitionedObjectRule = function(name, schema, options, defaultFormDef) {
    if (verifyType('object', schema.type) && schema.partition) {
      var f   = schemaFormProvider.stdFormObj(name, schema, options);
      f.type  = 'partitioned-object';
      f.partition = schema.partition;
      f.accordionHeading = schema.accordionHeading;
      f.key = options.path;
      f.items = [];
      options.lookup[sfPathProvider.stringify(options.path)] = f;

      //recurse down into properties
      angular.forEach(schema.properties, function(innerSchema, innerKey) {
        var path = options.path.slice();
        path.push(innerKey);
        if (options.ignore[sfPathProvider.stringify(path)] !== true) {
          var required = schema.required && schema.required.indexOf(innerKey) !== -1;
          var innerOptions = {
            path: path,
            required: required || false,
            lookup: options.lookup,
            ignore: options.ignore,
            global: options.global
          };

          var createChild = defaultFormDef || schemaFormProvider.defaultFormDefinition;
          var childForm = createChild(innerKey, innerSchema, innerOptions);
          if (childForm) {
            f.items.push(childForm);
          }
        }
      });

      return f;
    }
  };
  schemaFormProvider.prependRule('object', partitionedObjectRule);

  var nullableObjectRule = function(name, schema, options, defaultFormDef) {
    if (verifyType('object', schema.type) && schema.format === 'nullable') {
      var f   = schemaFormProvider.stdFormObj(name, schema, options);
      f.type  = 'nullable-object';
      f.nullable = schema.nullable;
      f.key = options.path;
      f.items = [];
      options.lookup[sfPathProvider.stringify(options.path)] = f;

      //recurse down into properties
      angular.forEach(schema.properties, function(innerSchema, innerKey) {
        var path = options.path.slice();
        path.push(innerKey);
        if (options.ignore[sfPathProvider.stringify(path)] !== true) {
          var required = schema.required && schema.required.indexOf(innerKey) !== -1;
          var innerOptions = {
            path: path,
            required: required || false,
            lookup: options.lookup,
            ignore: options.ignore,
            global: options.global
          };

          var createChild = defaultFormDef || schemaFormProvider.defaultFormDefinition;
          var childForm = createChild(innerKey, innerSchema, innerOptions);
          if (childForm) {
            f.items.push(childForm);
          }
        }
      });

      return f;
    }
  };
  schemaFormProvider.prependRule('object', nullableObjectRule);

  var dateTimeRule = function(name, schema, options) {
    if (verifyType('integer', schema.type) && schema.format === 'datetime') {
      var f = schemaFormProvider.stdFormObj(name, schema, options);
      f.key = options.path;
      f.type = 'datetime';
      options.lookup[sfPathProvider.stringify(options.path)] = f;
      return f;
    }
  };
  schemaFormProvider.prependRule('integer', dateTimeRule);
}

function postProcessProvider() {
  var postProcessFunctions = [];

  this.addPostProcess = function(postProcessFn) {
    postProcessFunctions.push(postProcessFn);
  };

  this.doPostProcess = function(canonicalForm) {
    for(var i=0; i<postProcessFunctions.length; i++) {
      canonicalForm = postProcessFunctions[i](canonicalForm);
    }
    return canonicalForm;
  }

  this.$get = function() {
    return {
      addPostProcess: this.addPostProcess
    };
  }
}

postProcessConfig.$inject = ['schemaFormProvider', 'postProcessProvider'];
function postProcessConfig(schemaFormProvider, postProcessProvider) {
  schemaFormProvider.postProcess(postProcessProvider.doPostProcess);
}

errorMessageConfig.$inject = ['sfErrorMessageProvider'];
function errorMessageConfig(sfErrorMessageProvider) {
  sfErrorMessageProvider.setDefaultMessage('badObject', 'Invalid Object');
  sfErrorMessageProvider.setDefaultMessage('badArray', 'Invalid Array');
  sfErrorMessageProvider.setDefaultMessage('badType', 'Unknown Type');
}

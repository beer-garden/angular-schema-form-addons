(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"), require("angular-ui-bootstrap"), require("angular-schema-form-bootstrap"), require("eonasdan-bootstrap-datetimepicker"), require("jquery"), require("moment"));
	else if(typeof define === 'function' && define.amd)
		define(["angular", "angular-ui-bootstrap", "angular-schema-form-bootstrap", "eonasdan-bootstrap-datetimepicker", "jquery", "moment"], factory);
	else if(typeof exports === 'object')
		exports["addons"] = factory(require("angular"), require("angular-ui-bootstrap"), require("angular-schema-form-bootstrap"), require("eonasdan-bootstrap-datetimepicker"), require("jquery"), require("moment"));
	else
		root["addons"] = factory(root["angular"], root["angular-ui-bootstrap"], root["angular-schema-form-bootstrap"], root["eonasdan-bootstrap-datetimepicker"], root["jquery"], root["moment"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_17__, __WEBPACK_EXTERNAL_MODULE_18__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(4);

__webpack_require__(5);

var _dynamicChoices = __webpack_require__(10);

var _fileUpload = __webpack_require__(11);

var _raw = __webpack_require__(12);

var _dictionary = __webpack_require__(13);

var _nullableObject = __webpack_require__(14);

var _partitionedObject = __webpack_require__(15);

var _datetime = __webpack_require__(16);

var _array = __webpack_require__(19);

var _array2 = _interopRequireDefault(_array);

var _accordion = __webpack_require__(20);

var _accordion2 = _interopRequireDefault(_accordion);

var _fileUpload2 = __webpack_require__(21);

var _fileUpload3 = _interopRequireDefault(_fileUpload2);

var _typeahead = __webpack_require__(22);

var _typeahead2 = _interopRequireDefault(_typeahead);

var _select = __webpack_require__(23);

var _select2 = _interopRequireDefault(_select);

var _raw2 = __webpack_require__(24);

var _raw3 = _interopRequireDefault(_raw2);

var _dictionary2 = __webpack_require__(25);

var _dictionary3 = _interopRequireDefault(_dictionary2);

var _partitionedObject2 = __webpack_require__(26);

var _partitionedObject3 = _interopRequireDefault(_partitionedObject2);

var _nullableObject2 = __webpack_require__(27);

var _nullableObject3 = _interopRequireDefault(_nullableObject2);

var _datetime2 = __webpack_require__(28);

var _datetime3 = _interopRequireDefault(_datetime2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_angular2.default.module('beer-garden.addons', ['schemaForm']).provider('postProcess', postProcessProvider).config(postProcessConfig).config(errorMessageConfig).config(addonsConfig).directive('dynamicChoices', _dynamicChoices.dynamicChoicesDirective).directive('raw', _raw.rawDirective).directive('dictionary', _dictionary.dictionaryDirective).directive('nullableObject', _nullableObject.nullableObjectDirective).directive('fileUpload', _fileUpload.fileUploadDirective).directive('dateTime', _datetime.dateTimeDirective).run(_nullableObject.nullableObjectPostProcessor);

addonsConfig.$inject = ['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfBuilderProvider', 'sfPathProvider'];
function addonsConfig(schemaFormProvider, schemaFormDecoratorsProvider, sfBuilderProvider, sfPathProvider) {

  // Alias these for brevity later
  var sfField = sfBuilderProvider.builders.sfField;
  var transclusion = sfBuilderProvider.builders.transclusion;
  var condition = sfBuilderProvider.builders.condition;
  var ngModelOptions = sfBuilderProvider.builders.ngModelOptions;
  var ngModel = sfBuilderProvider.builders.ngModel;
  var array = sfBuilderProvider.builders.array;
  var stdBuilders = sfBuilderProvider.stdBuilders;

  // Define all the new addons
  schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator', 'array', _array2.default, [sfField, ngModelOptions, ngModel, array, condition]);

  schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator', 'base64file', _fileUpload3.default, stdBuilders);

  schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator', 'accordion', _accordion2.default, [sfField, transclusion, condition]);

  schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator', 'typeahead', _typeahead2.default, stdBuilders);

  schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator', 'select', _select2.default, stdBuilders);

  schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator', 'variant', _raw3.default, stdBuilders);

  schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator', 'dictionary', _dictionary3.default, stdBuilders);

  schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator', 'partitioned-object', _partitionedObject3.default, [sfField, _partitionedObject.partitionTransclusion, condition]);

  schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator', 'nullable-object', _nullableObject3.default, [sfField, transclusion, condition]);

  schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator', 'datetime', _datetime3.default, stdBuilders);

  // Helper function to verify schema types
  function verifyType(type, schemaType) {
    return typeof schemaType === 'string' && schemaType === type || Array.isArray(schemaType) && schemaType.indexOf(type) !== -1;
  }

  // Now define and register rules for when these addons should be used
  var base64fileRule = function base64fileRule(name, schema, options) {
    if (verifyType('file', schema.type) && schema.format === 'base64') {
      var f = schemaFormProvider.stdFormObj(name, schema, options);
      f.key = options.path;
      f.type = 'base64file';
      f.validationMessage = {
        'maxFileUploadSize': "Max file size is " + (0, _fileUpload.formatFileSize)(schema.maxSize),
        'minFileUploadSize': "Min file size is " + (0, _fileUpload.formatFileSize)(schema.minSize)
      };
      options.lookup[sfPathProvider.stringify(options.path)] = f;
      return f;
    }
  };
  schemaFormProvider.prependRule('file', base64fileRule);

  var variantRule = function variantRule(name, schema, options) {
    if (verifyType('variant', schema.type)) {
      var f = schemaFormProvider.stdFormObj(name, schema, options);
      f.key = options.path;
      f.type = 'variant';
      f.validationMessage = {
        "badType": "Unknown Type. Remember, variant fields must " + "be enclosed with {} (object), [] (array), or \"\" (string)."
      };
      options.lookup[sfPathProvider.stringify(options.path)] = f;
      return f;
    }
  };
  schemaFormProvider.prependRule('variant', variantRule);

  var dictionaryRule = function dictionaryRule(name, schema, options) {
    if (verifyType('dictionary', schema.type)) {
      var f = schemaFormProvider.stdFormObj(name, schema, options);
      f.key = options.path;
      f.type = 'dictionary';
      options.lookup[sfPathProvider.stringify(options.path)] = f;
      return f;
    }
  };
  schemaFormProvider.prependRule('dictionary', dictionaryRule);

  var partitionedObjectRule = function partitionedObjectRule(name, schema, options, defaultFormDef) {
    if (verifyType('object', schema.type) && schema.partition) {
      var f = schemaFormProvider.stdFormObj(name, schema, options);
      f.type = 'partitioned-object';
      f.partition = schema.partition;
      f.accordionHeading = schema.accordionHeading;
      f.key = options.path;
      f.items = [];
      options.lookup[sfPathProvider.stringify(options.path)] = f;

      //recurse down into properties
      _angular2.default.forEach(schema.properties, function (innerSchema, innerKey) {
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

  var nullableObjectRule = function nullableObjectRule(name, schema, options, defaultFormDef) {
    if (verifyType('object', schema.type) && schema.format === 'nullable') {
      var f = schemaFormProvider.stdFormObj(name, schema, options);
      f.type = 'nullable-object';
      f.nullable = schema.nullable;
      f.key = options.path;
      f.items = [];
      options.lookup[sfPathProvider.stringify(options.path)] = f;

      //recurse down into properties
      _angular2.default.forEach(schema.properties, function (innerSchema, innerKey) {
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

  var dateTimeRule = function dateTimeRule(name, schema, options) {
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

  this.addPostProcess = function (postProcessFn) {
    postProcessFunctions.push(postProcessFn);
  };

  this.doPostProcess = function (canonicalForm) {
    for (var i = 0; i < postProcessFunctions.length; i++) {
      canonicalForm = postProcessFunctions[i](canonicalForm);
    }
    return canonicalForm;
  };

  this.$get = function () {
    return {
      addPostProcess: this.addPostProcess
    };
  };
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

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(8)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../css-loader/index.js!./bootstrap-datetimepicker.css", function() {
			var newContent = require("!!../../../css-loader/index.js!./bootstrap-datetimepicker.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, "/*!\n * Datetimepicker for Bootstrap 3\n * version : 4.17.47\n * https://github.com/Eonasdan/bootstrap-datetimepicker/\n */\n.bootstrap-datetimepicker-widget {\n  list-style: none;\n}\n.bootstrap-datetimepicker-widget.dropdown-menu {\n  display: block;\n  margin: 2px 0;\n  padding: 4px;\n  width: 19em;\n}\n@media (min-width: 768px) {\n  .bootstrap-datetimepicker-widget.dropdown-menu.timepicker-sbs {\n    width: 38em;\n  }\n}\n@media (min-width: 992px) {\n  .bootstrap-datetimepicker-widget.dropdown-menu.timepicker-sbs {\n    width: 38em;\n  }\n}\n@media (min-width: 1200px) {\n  .bootstrap-datetimepicker-widget.dropdown-menu.timepicker-sbs {\n    width: 38em;\n  }\n}\n.bootstrap-datetimepicker-widget.dropdown-menu:before,\n.bootstrap-datetimepicker-widget.dropdown-menu:after {\n  content: '';\n  display: inline-block;\n  position: absolute;\n}\n.bootstrap-datetimepicker-widget.dropdown-menu.bottom:before {\n  border-left: 7px solid transparent;\n  border-right: 7px solid transparent;\n  border-bottom: 7px solid #ccc;\n  border-bottom-color: rgba(0, 0, 0, 0.2);\n  top: -7px;\n  left: 7px;\n}\n.bootstrap-datetimepicker-widget.dropdown-menu.bottom:after {\n  border-left: 6px solid transparent;\n  border-right: 6px solid transparent;\n  border-bottom: 6px solid white;\n  top: -6px;\n  left: 8px;\n}\n.bootstrap-datetimepicker-widget.dropdown-menu.top:before {\n  border-left: 7px solid transparent;\n  border-right: 7px solid transparent;\n  border-top: 7px solid #ccc;\n  border-top-color: rgba(0, 0, 0, 0.2);\n  bottom: -7px;\n  left: 6px;\n}\n.bootstrap-datetimepicker-widget.dropdown-menu.top:after {\n  border-left: 6px solid transparent;\n  border-right: 6px solid transparent;\n  border-top: 6px solid white;\n  bottom: -6px;\n  left: 7px;\n}\n.bootstrap-datetimepicker-widget.dropdown-menu.pull-right:before {\n  left: auto;\n  right: 6px;\n}\n.bootstrap-datetimepicker-widget.dropdown-menu.pull-right:after {\n  left: auto;\n  right: 7px;\n}\n.bootstrap-datetimepicker-widget .list-unstyled {\n  margin: 0;\n}\n.bootstrap-datetimepicker-widget a[data-action] {\n  padding: 6px 0;\n}\n.bootstrap-datetimepicker-widget a[data-action]:active {\n  box-shadow: none;\n}\n.bootstrap-datetimepicker-widget .timepicker-hour,\n.bootstrap-datetimepicker-widget .timepicker-minute,\n.bootstrap-datetimepicker-widget .timepicker-second {\n  width: 54px;\n  font-weight: bold;\n  font-size: 1.2em;\n  margin: 0;\n}\n.bootstrap-datetimepicker-widget button[data-action] {\n  padding: 6px;\n}\n.bootstrap-datetimepicker-widget .btn[data-action=\"incrementHours\"]::after {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n  content: \"Increment Hours\";\n}\n.bootstrap-datetimepicker-widget .btn[data-action=\"incrementMinutes\"]::after {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n  content: \"Increment Minutes\";\n}\n.bootstrap-datetimepicker-widget .btn[data-action=\"decrementHours\"]::after {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n  content: \"Decrement Hours\";\n}\n.bootstrap-datetimepicker-widget .btn[data-action=\"decrementMinutes\"]::after {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n  content: \"Decrement Minutes\";\n}\n.bootstrap-datetimepicker-widget .btn[data-action=\"showHours\"]::after {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n  content: \"Show Hours\";\n}\n.bootstrap-datetimepicker-widget .btn[data-action=\"showMinutes\"]::after {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n  content: \"Show Minutes\";\n}\n.bootstrap-datetimepicker-widget .btn[data-action=\"togglePeriod\"]::after {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n  content: \"Toggle AM/PM\";\n}\n.bootstrap-datetimepicker-widget .btn[data-action=\"clear\"]::after {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n  content: \"Clear the picker\";\n}\n.bootstrap-datetimepicker-widget .btn[data-action=\"today\"]::after {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n  content: \"Set the date to today\";\n}\n.bootstrap-datetimepicker-widget .picker-switch {\n  text-align: center;\n}\n.bootstrap-datetimepicker-widget .picker-switch::after {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n  content: \"Toggle Date and Time Screens\";\n}\n.bootstrap-datetimepicker-widget .picker-switch td {\n  padding: 0;\n  margin: 0;\n  height: auto;\n  width: auto;\n  line-height: inherit;\n}\n.bootstrap-datetimepicker-widget .picker-switch td span {\n  line-height: 2.5;\n  height: 2.5em;\n  width: 100%;\n}\n.bootstrap-datetimepicker-widget table {\n  width: 100%;\n  margin: 0;\n}\n.bootstrap-datetimepicker-widget table td,\n.bootstrap-datetimepicker-widget table th {\n  text-align: center;\n  border-radius: 4px;\n}\n.bootstrap-datetimepicker-widget table th {\n  height: 20px;\n  line-height: 20px;\n  width: 20px;\n}\n.bootstrap-datetimepicker-widget table th.picker-switch {\n  width: 145px;\n}\n.bootstrap-datetimepicker-widget table th.disabled,\n.bootstrap-datetimepicker-widget table th.disabled:hover {\n  background: none;\n  color: #777777;\n  cursor: not-allowed;\n}\n.bootstrap-datetimepicker-widget table th.prev::after {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n  content: \"Previous Month\";\n}\n.bootstrap-datetimepicker-widget table th.next::after {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n  content: \"Next Month\";\n}\n.bootstrap-datetimepicker-widget table thead tr:first-child th {\n  cursor: pointer;\n}\n.bootstrap-datetimepicker-widget table thead tr:first-child th:hover {\n  background: #eeeeee;\n}\n.bootstrap-datetimepicker-widget table td {\n  height: 54px;\n  line-height: 54px;\n  width: 54px;\n}\n.bootstrap-datetimepicker-widget table td.cw {\n  font-size: .8em;\n  height: 20px;\n  line-height: 20px;\n  color: #777777;\n}\n.bootstrap-datetimepicker-widget table td.day {\n  height: 20px;\n  line-height: 20px;\n  width: 20px;\n}\n.bootstrap-datetimepicker-widget table td.day:hover,\n.bootstrap-datetimepicker-widget table td.hour:hover,\n.bootstrap-datetimepicker-widget table td.minute:hover,\n.bootstrap-datetimepicker-widget table td.second:hover {\n  background: #eeeeee;\n  cursor: pointer;\n}\n.bootstrap-datetimepicker-widget table td.old,\n.bootstrap-datetimepicker-widget table td.new {\n  color: #777777;\n}\n.bootstrap-datetimepicker-widget table td.today {\n  position: relative;\n}\n.bootstrap-datetimepicker-widget table td.today:before {\n  content: '';\n  display: inline-block;\n  border: solid transparent;\n  border-width: 0 0 7px 7px;\n  border-bottom-color: #337ab7;\n  border-top-color: rgba(0, 0, 0, 0.2);\n  position: absolute;\n  bottom: 4px;\n  right: 4px;\n}\n.bootstrap-datetimepicker-widget table td.active,\n.bootstrap-datetimepicker-widget table td.active:hover {\n  background-color: #337ab7;\n  color: #fff;\n  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);\n}\n.bootstrap-datetimepicker-widget table td.active.today:before {\n  border-bottom-color: #fff;\n}\n.bootstrap-datetimepicker-widget table td.disabled,\n.bootstrap-datetimepicker-widget table td.disabled:hover {\n  background: none;\n  color: #777777;\n  cursor: not-allowed;\n}\n.bootstrap-datetimepicker-widget table td span {\n  display: inline-block;\n  width: 54px;\n  height: 54px;\n  line-height: 54px;\n  margin: 2px 1.5px;\n  cursor: pointer;\n  border-radius: 4px;\n}\n.bootstrap-datetimepicker-widget table td span:hover {\n  background: #eeeeee;\n}\n.bootstrap-datetimepicker-widget table td span.active {\n  background-color: #337ab7;\n  color: #fff;\n  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);\n}\n.bootstrap-datetimepicker-widget table td span.old {\n  color: #777777;\n}\n.bootstrap-datetimepicker-widget table td span.disabled,\n.bootstrap-datetimepicker-widget table td span.disabled:hover {\n  background: none;\n  color: #777777;\n  cursor: not-allowed;\n}\n.bootstrap-datetimepicker-widget.usetwentyfour td.hour {\n  height: 27px;\n  line-height: 27px;\n}\n.bootstrap-datetimepicker-widget.wider {\n  width: 21em;\n}\n.bootstrap-datetimepicker-widget .datepicker-decades .decade {\n  line-height: 1.8em !important;\n}\n.input-group.date .input-group-addon {\n  cursor: pointer;\n}\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n}\n", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(9);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.dynamicChoicesDirective = dynamicChoicesDirective;

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

dynamicChoicesDirective.$inject = ['$http', '$q', 'filterFilter', 'sfPath', 'sfSelect'];
function dynamicChoicesDirective($http, $q, filterFilter, sfPath, sfSelect) {
  return {
    restrict: 'A',
    scope: false,
    priority: 400, // Must be <500 so number parser gets put in the correct place
    require: 'ngModel',
    link: function link(scope, element, attrs, ngModel) {
      var form = scope.form;
      form.titleMap = [];
      form.choices = form.choices || {};

      if (!form.validationMessage) {
        form.validationMessage = {};
      }
      form.validationMessage['anyOf'] = 'Value is not in list of allowed values';

      ngModel.$validators['anyOf'] = function (modelValue, viewValue) {
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
      ngModel.$validators['tv4-302'] = function (modelValue, viewValue) {
        return !form.required // We want to specifically disable this validator
        || ngModel.$pristine // User hasn't touched the control yet
        || modelValue !== null && modelValue !== undefined;
      };

      function getItemDisplay() {
        for (var i = 0; i < form.titleMap.length; i++) {
          if (form.titleMap[i]['value'] == ngModel.$modelValue) {
            return form.titleMap[i]['name'];
          }
        }
        return ngModel.$viewValue;
      }

      // We need to update the render functions to handle the case where the item names and values differ.
      // I think the 'correct' way to do this is to use the getterSetter ngModel option, but I couldn't get it working.
      // Hooking into rendering also helps with displaying a newly-invalid value when the titleMap itself changes.
      var originalRender = ngModel.$render;
      if (attrs.hasOwnProperty('bsSelect')) {
        ngModel.$render = function () {
          originalRender();
          if (ngModel.$modelValue) {
            element[0].childNodes[0].nodeValue = getItemDisplay() + ' ';
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

        // Typeaheads need to do some additional parsing and validtating for number types
        if (form.schema.type.indexOf('integer') !== -1 || form.schema.type.indexOf('number') !== -1) {
          ngModel.$parsers.push(function (value) {
            // See the later parsing comment for why we do this here, but we have to always start as valid
            ngModel.$setValidity('tv4-0', true);

            if (value === undefined || value === null) {
              return value;
            }
            if (value === '') {
              return null;
            } // Because Number('') = 0 ... wtf

            // It would be nice to have a validator that does this, but ASF (schema-validate directive) does type
            // checking in the parsers pipeline, so WE have to do it in the parsers pipeline before they do.
            var valueNumber = Number(value);
            if (isNaN(valueNumber) || form.schema.type.indexOf('integer') !== -1 && valueNumber != parseInt(value)) {
              ngModel.$setValidity('tv4-0', false);
              return undefined;
            }

            return valueNumber;
          });
        }
      }

      function resolve(input, typeString) {
        if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === typeString) {
          return input;
        } else if (typeof input === 'string') {
          var evaled = scope.$parent.evalExpr(input);
          if ((typeof evaled === 'undefined' ? 'undefined' : _typeof(evaled)) === typeString) {
            return evaled;
          } else {
            throw 'A string must match the name of a ' + typeString + ' in the parent scope';
          }
        }

        throw typeString + ' must be the name of a ' + typeString + ' in the parent scope or an actual ' + typeString;
      }

      function populateTitleMap() {

        // Invoke whatever method is specified to populate the titleMap
        var promise;
        if (form.choices.titleMap || form.choices.enum) {
          promise = $q.when(form.choices.titleMap || form.choices.enum);
        } else if (form.schema && "enum" in form.schema) {
          // ASF does additional verification on schema.enum - strings will work but objects won't
          if (form.schema.enum.length > 0 && form.schema.enum[0] instanceof Object) {
            console.warn("Using an enum of Objects is not recommended, try using form.choices.titleMap instead");
          }
          promise = $q.when(form.schema.enum);
        } else if (form.choices.callback) {
          var args = [];

          if (form.choices.callback.arguments) {
            if (!Array.isArray(form.choices.callback.arguments)) {
              form.choices.callback.arguments = [form.choices.callback.arguments];
            }
            args = Array.from(form.choices.callback.arguments);
          }

          if (form.choices.callback.argumentFields) {
            if (typeof form.choices.callback.argumentFields === "string") {
              form.choices.callback.argumentFields = [form.choices.callback.argumentFields];
            }
            for (var i = 0; i < form.choices.callback.argumentFields.length; i++) {
              args.push(sfSelect(form.choices.callback.argumentFields[i], scope.model));
            }
          }

          promise = $q.when(resolve(form.choices.callback.function, 'function').apply(null, args));
        } else if (form.choices.httpGet) {
          var modelParams = {};
          for (var key in form.choices.httpGet.queryParameterFields) {
            if (form.choices.httpGet.queryParameterFields.hasOwnProperty(key)) {
              modelParams[key] = sfSelect(form.choices.httpGet.queryParameterFields[key], scope.model);
            }
          }

          args = Object.assign({}, form.choices.httpGet.queryParameters, modelParams);

          promise = $http.get(form.choices.httpGet.url, { params: args }).then(function (response) {
            return response.data;
          }, function (response) {
            throw { message: response.data, url: response.config.url };
          });
        } else {
          promise = $q.reject({ message: "No way to popluate title map for " + form.key });
        }

        return promise.then(function (response) {
          finalizeTitleMap(response);
        }, function (response) {
          handleError(response);
        });
      }

      function finalizeTitleMap(data) {

        // We want to be able to transform the data before attempting to parse out the titleMap
        if (form.choices.transforms) {
          if (!Array.isArray(form.choices.transforms)) {
            form.choices.transforms = [form.choices.transforms];
          }

          for (var i = 0; i < form.choices.transforms.length; i++) {
            var transform = form.choices.transforms[i];

            if (transform === 'keys') {
              data = Object.keys(data);
            } else if (transform === 'fixNull') {
              // If there's already an element with the null value make sure it's at the front
              var nullItem = { value: null, text: 'Select One' };

              for (var j = 0; j < data.length; j++) {
                if (data[j] === null) {
                  data.splice(j, 1);
                  break;
                } else if (_typeof(data[j]) === 'object' && data[j]['value'] === null) {
                  nullItem = data[j];
                  data.splice(j, 1);
                  break;
                }
              }
              data.unshift(nullItem);
            } else if (transform !== null && (typeof transform === 'undefined' ? 'undefined' : _typeof(transform)) === 'object') {
              if (transform.lookup) {
                data = data[transform.lookup];
              } else if (transform.lookupField) {
                var keyValue = sfSelect(transform.lookupField, scope.model);

                if (keyValue === undefined) {
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
        for (var i = 0; i < data.length; i++) {
          if (data[i] instanceof Object) {
            newTitleMap.push({
              value: data[i]['value'],
              name: data[i]['text'] ? '' + data[i]['text'] : '' + data[i]['value'],
              category: data[i]['category']
            });
          } else {
            newTitleMap.push({ name: '' + data[i], value: data[i] });
          }
        }

        // Also have some transforms that occur after titleMap creation
        if (form.choices.transforms) {
          for (var i = 0; i < form.choices.transforms.length; i++) {
            var transform = form.choices.transforms[i];

            if (transform !== null && (typeof transform === 'undefined' ? 'undefined' : _typeof(transform)) === 'object') {
              if (transform.categoryField) {
                var category = sfSelect(transform.categoryField, scope.model);

                // The built-in Angular filter returns everything if the input is undefined which is not what we want
                newTitleMap = category === undefined ? [] : filterFilter(newTitleMap, { category: category });
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
      if (form.choices.updateOn && form.choices.updateOn.length > 0) {
        var setupWatch = function setupWatch(watchKey) {
          scope.$watch('model' + watchKey, function (newVal, oldVal) {
            populateTitleMap().finally(function () {
              scope.$emit('sf-changed-titlemap', form.key);
            });
          });
        };

        if (typeof form.choices.updateOn === "string") {
          form.choices.updateOn = [form.choices.updateOn];
        }

        for (var i = 0; i < form.choices.updateOn.length; i++) {
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

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatFileSize = exports.fileUploadDirective = undefined;

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

fileUploadDirective.$inject = ['$timeout'];
function fileUploadDirective($timeout) {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: true,
    priority: 500,
    link: function link(scope, element, attrs, ngModel) {
      scope.ngModel = ngModel;
      scope.file = undefined;
      scope.hasFile = false;
      scope.fileName = undefined;

      // Used to trigger the click() event on the hidden file input field.
      scope.fileInput = element[0].querySelector('.file-upload-field');

      scope.validateField = function (value) {
        if (value === null || value === undefined || value.trim().length === 0) {
          if (scope.form.required) {
            // 302 is the error code for required
            ngModel.$setValidity('tv4-302', false);
          }
        }
      };

      // Since we are not using the sf-validate directive, we need
      // to manually listen for the validate event and call our validation
      // function. This basically just applies the required validator.
      scope.$on('schemaFormValidate', function () {
        scope.validateField(ngModel.$viewValue);
      });

      var validateFile = function validateFile(file) {
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
      };

      var getFile = function getFile(file) {

        // Reset all errors so we start with a clean slate
        Object.keys(ngModel.$error).forEach(function (k) {
          ngModel.$setValidity(k, true);
        });

        if (!file) {
          return;
        }

        if (!validateFile(file)) {
          return;
        }

        var reader = new FileReader();

        scope.file = file;
        scope.fileName = file.name;
        scope.hasFile = true;
        scope.file.ext = file.name.split('.').slice(-1)[0];
        scope.file.src = URL.createObjectURL(file);

        reader.onloadstart = function (e) {
          $timeout(function () {
            scope.loadingFile = true;
          }, 0);
        };

        reader.onload = function (e) {
          $timeout(function () {
            scope.loadingFile = false;
          }, 0);

          var prefix = 'file:' + file.name + ';';
          ngModel.$setViewValue(prefix + e.target.result);
        };

        reader.readAsDataURL(file);
        scope.$apply();
      };

      scope.removeFile = function (e) {
        e.preventDefault();
        e.stopPropagation();
        scope.file = undefined;
        scope.hasFile = false;
        scope.fileName = undefined;
        ngModel.$setViewValue(undefined);
      };

      _angular2.default.element(scope.fileInput).bind('change', function (e) {
        getFile(e.target.files[0]);
      });
    }
  };
}

function formatFileSize(size) {
  var sizeToReturn = undefined;
  if (_angular2.default.isDefined(size) && size !== null) {
    var formattedSize = undefined;
    var sizeType = undefined;
    if (size > 1024 * 1024 * 1024) {
      formattedSize = (size / 1024 / 1024 / 1024).toFixed(1);
      sizeType = 'GB';
    } else if (size > 1024 * 1024) {
      formattedSize = (size / 1024 / 1024).toFixed(1);
      sizeType = 'MB';
    } else if (size > 1024 * 1024) {
      formattedSize = (size / 1024).toFixed(1);
      sizeType = 'KB';
    } else {
      formattedSize = size;
      sizeType = 'B';
    }
    sizeToReturn = formattedSize + ' ' + sizeType;
  }
  return sizeToReturn;
}

exports.fileUploadDirective = fileUploadDirective;
exports.formatFileSize = formatFileSize;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.rawDirective = rawDirective;

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function rawDirective() {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: true,
    priority: 500,
    link: function link(scope, element, attrs, ngModel) {

      // We need the ngModelController in several places, most notably for errors. So we emit it up to the
      // decorator directive so it can be put on the right scope.
      // Basically, stuff doesn't work inside sfArray without this
      scope.$emit('schemaFormPropagateNgModelController', ngModel);

      // Make sure that the value is stringified so it can be displayed correctly
      ngModel.$formatters.push(function (value) {
        return _angular2.default.toJson(value);
      });

      ngModel.$parsers.unshift(function (value) {
        if (value === null || value === undefined || value.trim().length === 0) return null;

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
        return ['object', 'number', 'boolean'].indexOf(typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== -1 || value === null || value === undefined;
      }

      ngModel.$validators['tv4-302'] = function (modelValue, viewValue) {
        return !scope.form.required || ngModel.$pristine || modelValue !== null && modelValue !== undefined;
      };
      ngModel.$validators['badObject'] = function (modelValue, viewValue) {
        return parseSuccessfulOrEmpty(modelValue) || !modelValue.startsWith('{');
      };
      ngModel.$validators['badArray'] = function (modelValue, viewValue) {
        return parseSuccessfulOrEmpty(modelValue) || !modelValue.startsWith('[');
      };
      ngModel.$validators['badType'] = function (modelValue, viewValue) {
        return parseSuccessfulOrEmpty(modelValue) || viewValue.startsWith('{') || viewValue.startsWith('[') || viewValue.startsWith('"') && viewValue.endsWith('"') && viewValue.length > 1;
      };

      // Need to listen for the validate event
      scope.$on('schemaFormValidate', function () {
        ngModel.$setDirty();
        ngModel.$validate();
      });
    }
  };
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.dictionaryDirective = dictionaryDirective;

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dictionaryDirective() {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: true,
    priority: 500,
    link: function link(scope, element, attrs, ngModel) {

      // We need the ngModelController in several places, most notably for errors. So we emit it up to the
      // decorator directive so it can be put on the right scope.
      // Basically, stuff doesn't work inside sfArray without this
      scope.$emit('schemaFormPropagateNgModelController', ngModel);

      // Make sure that the value is stringified so it can be displayed correctly
      ngModel.$formatters.push(function (value) {
        return _angular2.default.isObject(value) ? _angular2.default.toJson(value) : value;
      });

      ngModel.$parsers.unshift(function (value) {
        if (value === null || value === undefined || value.trim().length === 0) return null;

        value = value.trim();

        if (value.indexOf('{') === 0) {
          try {
            return JSON.parse(value);
          } catch (e) {}
        }

        return value;
      });

      ngModel.$validators['tv4-302'] = function (modelValue, viewValue) {
        return !scope.form.required || ngModel.$pristine || modelValue !== null && modelValue !== undefined;
      };
      ngModel.$validators['badObject'] = function (modelValue, viewValue) {
        return (typeof modelValue === 'undefined' ? 'undefined' : _typeof(modelValue)) === 'object' || typeof modelValue === 'undefined';
      };

      // Need to listen for the validate event
      scope.$on('schemaFormValidate', function () {
        ngModel.$setDirty();
        ngModel.$validate();
      });
    }
  };
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nullableObjectDirective = nullableObjectDirective;
exports.nullableObjectPostProcessor = nullableObjectPostProcessor;

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

nullableObjectDirective.$inject = ['schemaForm', 'sfSelect', 'sfPath'];
function nullableObjectDirective(schemaForm, sfSelect, sfPath) {
  return {
    restrict: 'A',
    scope: false,
    priority: 500,
    link: function link(scope, element, attrs) {

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
        _angular2.default.copy(formObj.schema.tempProperties, formObj.schema.properties);
        delete formObj.schema.tempProperties;

        delete formObj.schema.format;
        if (formObj.schema.partition) {
          formObj.type = 'partitioned-object';
          formObj.partition = formObj.schema.partition;
          formObj.accordionHeading = formObj.schema.accordionHeading;
        }

        // Reset array values
        var needRedraw = false;
        schemaForm.traverseForm(formObj, function (nestedFormObj) {
          if (nestedFormObj.type === 'array') {
            needRedraw = true;
            nestedFormObj.startEmpty = nestedFormObj.tempStartEmpty;
            delete nestedFormObj.tempStartEmpty;
          }
          if (!needRedraw && formObj.schema.partition && nestedFormObj.schema.optional) {
            needRedraw = true;
          }
        });

        // If we don't need to redraw we can just set the model to the defaults
        if (!needRedraw) {
          if (!scope.options || scope.options.setSchemaDefaults !== false) {
            schemaForm.traverseSchema(formObj.schema, function (prop, path) {
              if (_angular2.default.isDefined(prop['default'])) {
                var fullPath = sfPath.normalize(formObj.key.concat(path));
                var val = sfSelect(fullPath, scope.model);
                if (_angular2.default.isUndefined(val)) {
                  sfSelect(fullPath, scope.model, prop['default']);
                }
              }
            });
          }
          formObj.created = true;
          scope.$emit('sf-changed');
        } else {
          formObj.created = true;
          scope.$emit('schemaFormRedraw');
        }
      };
    }
  };
}

nullableObjectPostProcessor.$inject = ['postProcess', 'schemaForm'];
function nullableObjectPostProcessor(postProcess, schemaForm) {

  var nullablePostProcess = function nullablePostProcess(canonicalForm) {
    // The canonicalForm is passed as an array, so we need to iterate over
    // each item and traverse down the children
    for (var i = 0; i < canonicalForm.length; i++) {
      schemaForm.traverseForm(canonicalForm[i], function (formObj) {

        // If a nullable-object hasn't been created save off the properties
        if (formObj.type === 'nullable-object' && !formObj.created && !_angular2.default.equals({}, formObj.schema.properties)) {

          formObj.schema.tempProperties = _angular2.default.copy(formObj.schema.properties);
          formObj.schema.properties = {};

          // If the nullable-object has array children, they need to start
          // empty so the model doesn't get populated
          schemaForm.traverseForm(formObj, function (nestedFormObj) {
            if (nestedFormObj.type === 'array') {
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

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var partitionTransclusion = function partitionTransclusion(args) {
  // Make sure we have a transclusion field
  var transElement = args.fieldFrag.querySelector('[sf-field-transclude]');
  if (transElement) {

    var matchItems = [],
        noMatchItems = [];

    // sf-field-transclude is not a directive but has the name
    // of what we're supposed to traverse. Default to `items`
    var sub = transElement.getAttribute('sf-field-transclude') || 'items';
    var items = args.form[sub];

    try {
      // Grab the partition from the form and possibly negate it
      var condition = args.form.partition;
      var negate = false;
      if (condition.startsWith('!')) {
        negate = true;
        condition = condition.substr(1);
      }

      // Actually partition items into their buckets
      angular.forEach(items, function (item) {
        if (item['schema'][condition] && !negate || !item['schema'][condition] && negate) {
          matchItems.push(item);
        } else {
          noMatchItems.push(item);
        }
      });
    }
    // If anything goes wrong just treat as a non-partitioned object
    catch (err) {
      matchItems = items;
    }

    // Find BOTH insertion points now, otherwise nesting causes problems
    var matchFrag = args.fieldFrag.querySelector('[sf-transclude-match]');
    var noMatchFrag = args.fieldFrag.querySelector('[sf-transclude-nomatch]');

    // Build the child fragements and add them in the correct place
    if (matchItems.length) {
      matchFrag.appendChild(args.build(matchItems, args.path + '.' + sub, args.state));
    }
    if (noMatchItems.length) {
      noMatchFrag.appendChild(args.build(noMatchItems, args.path + '.' + sub, args.state));

      args.form.hasPartition = true;
    }
  }
};

exports.partitionTransclusion = partitionTransclusion;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateTimeDirective = dateTimeDirective;

var _jquery = __webpack_require__(17);

var _jquery2 = _interopRequireDefault(_jquery);

var _moment = __webpack_require__(18);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This is heavily based on the 'eonasdan-bootstrap-datetimepicker' package

dateTimeDirective.$inject = ['$timeout'];
function dateTimeDirective($timeout) {
  return {
    restrict: 'EA',
    require: 'ngModel',
    scope: false,
    link: function link($scope, $element, $attrs, ngModel) {
      var dpElement = $element.parent().hasClass('input-group') ? $element.parent() : $element;

      // Set up some default options that can be overridden
      var options = Object.assign({
        format: 'MM/DD/YYYY hh:mm A',
        keepInvalid: true,
        showTodayButton: true,
        showClear: true
      }, $scope.form.options);

      // This thing is probably expensive - make sure we destroy it
      $scope.$on('$destroy', function () {
        dpElement.data('DateTimePicker').destroy();
      });

      ngModel.$parsers.unshift(function (value) {
        // We need to translate when the text field is manually changed
        if (typeof value === 'string') {
          if (value.trim().length === 0) {
            return null;
          }

          var parsedMoment = (0, _moment2.default)(value, options['format']);
          return parsedMoment.isValid() ? parsedMoment.valueOf() : value;
        }
        return value;
      });

      ngModel.$render = function () {
        // Make sure we clear the datepicker if there's no value
        if (!ngModel.$viewValue && dpElement.data('DateTimePicker').date()) {
          dpElement.data('DateTimePicker').clear();
        }
        // We have a value, we just need to give the datepicker a moment object
        else if (ngModel.$viewValue) {
            var viewMoment = _moment2.default.isMoment(ngModel.$viewValue) ? ngModel.$viewValue : (0, _moment2.default)(ngModel.$viewValue, 'x');
            dpElement.data('DateTimePicker').date(viewMoment);
          }
      };

      // changeEvent contains the new and old moment objects (date and oldDate).
      // Date will be false if the date has been cleared, which we want to translate to null
      // Data.valueOf() will be NaN if the control couldn't parse the input (which means it's probably a string),
      // which we want to leave unchanged
      dpElement.on('dp.change', function (changeEvent) {
        var newValue = changeEvent.date === false ? null : changeEvent.date.valueOf();

        if (!Number.isNaN(newValue)) {
          ngModel.$setViewValue(newValue);
        }
      });

      dpElement.datetimepicker(options);
    }
  };
}

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_17__;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_18__;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

var path = '/templates/array.html';
var html = "<div  class=\"schema-form-array {{::form.htmlClass + ' ' + idClass}}\"\n      sf-field-model=\"sf-new-array\"\n      sf-new-array>\n  <label class=\"control-label\" ng-show=\"showTitle()\">{{ form.title }}</label>\n  <ol class=\"list-group\" sf-field-model ui-sortable=\"form.sortOptions\">\n    <li class=\"list-group-item {{::form.fieldHtmlClass}}\"\n        sf-field-model=\"ng-repeat\"\n        ng-repeat=\"item in $$value$$ track by $index\">\n      <button ng-hide=\"form.readonly || form.remove === null\"\n              ng-click=\"deleteFromArray(item)\"\n              ng-disabled=\"form.schema.minItems >= modelArray.length\"\n              style=\"position: relative; z-index: 20;\"\n              type=\"button\" class=\"close pull-right\">\n              <span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span>\n      </button>\n      <div schema-form-array-items sf-key-controller sf-parent-key=\"[{{form.key.join('][')}}]\" sf-index=\"{{$index}}\"></div>\n    </li>\n  </ol>\n  <div class=\"clearfix\" style=\"padding: 15px;\" ng-model=\"modelArray\" schema-validate=\"form\">\n    <div class=\"help-block\"\n         ng-show=\"(hasError() && errorMessage(schemaError())) || form.description\"\n         ng-bind-html=\"(hasError() && errorMessage(schemaError())) || form.description\"></div>\n\n    <button ng-hide=\"form.readonly || form.add === null\"\n            ng-click=\"appendToArray()\"\n            ng-disabled=\"form.schema.maxItems <= modelArray.length\"\n            type=\"button\"\n            class=\"btn {{ form.style.add || 'btn-default' }} pull-right\">\n      <i class=\"glyphicon glyphicon-plus\"></i>\n      {{ form.add || 'Add'}}\n    </button>\n  </div>\n</div>\n";
window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

var path = '/templates/accordion.html';
var html = "<div>\n  <uib-accordion ng-disabled=\"form.readonly\" class=\"schema-form-fieldset {{form.htmlClass}}\">\n    <div uib-accordion-group class=\"panel panel-default\">\n      <uib-accordion-heading>\n        <span class=\"glyphicon glyphicon-plus-sign\" style=\"margin-right:8px;\"></span>\n        <span>{{form.title}}</span>\n      </uib-accordion-heading>\n      <div sf-field-transclude></div>\n    </div>\n  </uib-accordion>\n</div>\n";
window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

var path = '/templates/file-upload.html';
var html = "<div\n class=\"form-group has-feedback {{form.htmlClass}}\"\n ng-class=\"{'has-error': form.disableErrorState !== true && hasError(), 'has-success': form.disableSuccessState !== true && hasSuccess()}\"\n file-upload=\"form\"\n sf-field-model\n sf-changed=\"form\"\n ng-model-options=\"form.ngModelOptions\"\n >\n\n  <label\n    class=\"{{form.labelHtmlClass}}\"\n    ng-class=\"{'sr-only': !showTitle()}\"\n    for=\"{{form.key.slice(-1)[0]}}\"\n  >{{form.title}}</label>\n\n  <input\n    id=\"{{form.key.slice(-1)[0]}}\"\n    name=\"{{form.key.slice(-1)[0]}}\"\n    class=\"form-control {{form.fieldHtmlClass}} file-upload-field\"\n    type=\"file\"\n    style=\"visibility: hidden; position: absolute;\" />\n\n  <div class=\"input-group col-xs-12\">\n    <span class=\"input-group-addon\" ng-click=\"fileInput.click()\"><i class=\"glyphicon glyphicon-upload\"></i></span>\n    <input type=\"text\" class=\"form-control input-lg\" disabled placeholder=\"{{fileName || form.placeholder || 'Upload File'}}\" />\n    <span class=\"input-group-btn\">\n      <button class=\"btn btn-info input-lg\" ng-show=\"hasFile\" type=\"button\" ng-click=\"removeFile($event)\">\n        <i class=\"glyphicon glyphicon-remove\"></i> Remove</button>\n      <button class=\"btn btn-primary input-lg\" ng-show=\"!hasFile\" ng-disabled=\"form.readonly\" type=\"button\" ng-click=\"fileInput.click()\">\n        <i class=\"glyphicon glyphicon-search\"></i> Browse</button>\n    </span>\n  </div>\n\n  <div\n    class=\"help-block\"\n    sf-message=\"form.description\">\n  </div>\n</div>\n";
window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

var path = '/templates/typeahead.html';
var html = "<div\n  class=\"form-group has-feedback {{form.htmlClass}}\"\n  ng-class=\"{'has-error': form.disableErrorState !== true && hasError(), 'has-success': form.disableSuccessState !== true && hasSuccess()}\">\n\n  <label\n    class=\"{{form.labelHtmlClass}}\"\n    ng-class=\"{'sr-only': !showTitle()}\"\n    for=\"{{form.key.slice(-1)[0]}}\"\n  >{{form.title}}</label>\n\n  <span\n    class=\"glyphicon glyphicon-info-sign\"\n    style=\"cursor: default;\"\n    ng-show=\"form.fetchErrorMessage\"\n    uib-popover=\"{{form.fetchErrorMessage}}\"\n    popover-title=\"Error Populating Choices\"\n    popover-animation=\"true\"\n    popover-placement=\"right\"\n    popover-trigger=\"'mouseenter'\"\n  ></span>\n\n  <input\n    type=\"text\"\n    class=\"form-control {{form.fieldHtmlClass}}\"\n    dynamic-choices\n    sf-field-model\n    sf-changed=\"form\"\n    schema-validate=\"form\"\n    ng-model-options=\"{ allowInvalid: true }\"\n    uib-typeahead=\"item.value as item.name for item in form.titleMap | filter:{'name': $viewValue} | limitTo:8\"\n    typeahead-min-length=\"0\"\n    placeholder=\"{{form.placeholder || form.schema.placeholder || ('')}}\"\n  ></input>\n\n  <span\n    ng-if=\"form.feedback !== false\"\n    class=\"form-control-feedback\"\n    ng-class=\"evalInScope(form.feedback) || {'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError() }\"\n    aria-hidden=\"true\"\n  ></span>\n\n  <div\n    class=\"help-block\"\n    sf-message=\"form.description\">\n  </div>\n</div>\n";
window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

var path = '/templates/select.html';
var html = "<div\n  class=\"form-group {{form.htmlClass}}\"\n  ng-class=\"{'has-error': hasError(), 'has-success': hasSuccess()}\">\n\n  <label\n    class=\"control-label {{form.labelHtmlClass}}\"\n    ng-show=\"showTitle()\"\n  >{{form.title}}</label>\n\n  <span\n    class=\"glyphicon glyphicon-info-sign\"\n    style=\"cursor: default;\"\n    ng-show=\"form.fetchErrorMessage\"\n    uib-popover=\"{{form.fetchErrorMessage}}\"\n    popover-title=\"Error Populating Choices\"\n    popover-animation=\"true\"\n    popover-placement=\"right\"\n    popover-trigger=\"'mouseenter'\"\n  ></span>\n\n  <div class=\"form-group\">\n\n    <button\n      type=\"button\"\n      class=\"btn btn-default {{form.fieldHtmlClass}}\"\n      dynamic-choices\n      sf-field-model\n      sf-changed=\"form\"\n      schema-validate=\"form\"\n      ng-model-options=\"{ allowInvalid: true }\"\n      ng-disabled=\"form.disabled\"\n      data-placeholder=\"{{form.placeholder || form.schema.placeholder || ('Select One')}}\"\n      data-placement=\"{{form.options.placement || 'bottom-left'}}\"\n      bs-options=\"item.value as item.name for item in form.titleMap\"\n      bs-select>\n    </button>\n\n    <div\n      class=\"help-block\"\n      sf-message=\"form.description\">\n    </div>\n  </div>\n</div>\n";
window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

var path = '/templates/raw.html';
var html = "<div\n  class=\"form-group has-feedback {{form.htmlClass}}\"\n  ng-class=\"{ 'has-error': form.disableErrorState !== true && hasError(), 'has-success': form.disableSuccessState !== true && hasSuccess()}\">\n\n  <label\n    class=\"{{form.labelHtmlClass}}\"\n    ng-class=\"{'sr-only': !showTitle()}\"\n    for=\"{{form.key.slice(-1)[0]}}\"\n  >{{form.title}}</label>\n\n  <input\n    id=\"{{form.key.slice(-1)[0]}}\"\n    name=\"{{form.key.slice(-1)[0]}}\"\n    class=\"form-control {{form.fieldHtmlClass}}\"\n    type=\"text\"\n    sf-field-model\n    sf-changed=\"form\"\n    placeholder=\"{{form.placeholder}}\"\n    ng-disabled=\"form.readonly\"\n    ng-model-options=\"form.ngModelOptions\"\n    raw\n  ></input>\n\n  <span\n    ng-if=\"form.feedback !== false\"\n    class=\"form-control-feedback\"\n    ng-class=\"evalInScope(form.feedback) || {'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError() }\"\n    aria-hidden=\"true\"\n  ></span>\n\n  <div\n    class=\"help-block\"\n    sf-message=\"form.description\">\n  </div>\n</div>\n";
window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

var path = '/templates/dictionary.html';
var html = "<div class=\"form-group has-feedback {{form.htmlClass}} schema-form-textarea\"\n     ng-class=\"{\n       'has-error': form.disableErrorState !== true && hasError(),\n       'has-success': form.disableSuccessState !== true && hasSuccess(),\n       'has-feedback': form.feedback !== false,\n       'required': form.required === true\n     }\">\n\n  <label\n    class=\"{{form.labelHtmlClass}}\"\n    ng-class=\"{'sr-only': !showTitle()}\"\n    for=\"{{::fieldId(true, false)}}\"\n  >{{form.title}}</label>\n\n  <textarea\n    id=\"{{::fieldId(true, false)}}\"\n    name=\"{{::fieldId(true, false)}}\"\n    class=\"form-control {{form.fieldHtmlClass}}\"\n    sf-field-model\n    sf-changed=\"form\"\n    placeholder=\"{{form.placeholder}}\"\n    ng-disabled=\"form.readonly\"\n    ng-model-options=\"form.ngModelOptions\"\n    dictionary\n  ></textarea>\n\n  <span\n    ng-if=\"form.feedback !== false\"\n    class=\"form-control-feedback\"\n    ng-class=\"evalInScope(form.feedback) || {'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError() }\"\n    aria-hidden=\"true\"\n  ></span>\n\n  <div\n    class=\"help-block\"\n    sf-message=\"form.description\">\n  </div>\n</div>\n";
window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

var path = '/templates/partitioned-object.html';
var html = "<fieldset\n  class=\"form-group schema-form-fieldset {{form.htmlClass}}\"\n  ng-disabled=\"form.readonly\"\n  sf-field-transclude>\n\n  <div style=\"border: 1px solid #ddd; border-radius: 4px; padding: 5px 15px 10px\">\n\n    <div>\n      <div style=\"font-size: 21px; border-bottom: 1px solid #ddd\" ng-class=\"{'sr-only': !showTitle() }\">{{ form.title }}</div>\n      <div class=\"help-block\" sf-message=\"form.description\"></div>\n    </div>\n\n    <div sf-transclude-match></div>\n\n    <uib-accordion ng-if=\"form.hasPartition\">\n      <div uib-accordion-group class=\"panel panel-default\">\n        <uib-accordion-heading>\n          <span class=\"glyphicon glyphicon-plus-sign\" style=\"margin-right:8px;\"></span>\n          <span>{{form.accordionHeading}}</span>\n        </uib-accordion-heading>\n        <div sf-transclude-nomatch></div>\n      </div>\n    </uib-accordion>\n\n  </div>\n</fieldset>\n";
window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

var path = '/templates/nullable-object.html';
var html = "<fieldset\n  class=\"form-group schema-form-fieldset {{form.htmlClass}}\"\n  ng-disabled=\"form.readonly\"\n  nullable-object>\n\n  <div style=\"border: 1px solid #ddd; border-radius: 4px; padding: 5px 15px 10px\">\n\n    <div>\n      <div style=\"font-size: 21px; border-bottom: 1px solid #ddd\" ng-class=\"{'sr-only': !showTitle() }\">{{ form.title }}</div>\n      <div class=\"help-block\" sf-message=\"form.description\"></div>\n    </div>\n\n    <button\n      class=\"btn btn-default\"\n      type=\"button\"\n      ng-if=\"!form.created\"\n      ng-click=\"createObject($event, form)\"\n      ng-disabled=\"form.readonly\">\n\n      <span class=\"glyphicon glyphicon-plus\"></span>\n      <span>Create Model</span>\n    </button>\n\n    <fieldset ng-if=\"form.created\">\n      <div sf-field-transclude></div>\n    </fieldset>\n\n  </div>\n</fieldset>\n";
window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

var path = '/templates/datetime.html';
var html = "<div\n  class=\"form-group {{form.htmlClass}}\"\n  ng-class=\"{'has-error': form.disableErrorState !== true && hasError(), 'has-success': form.disableSuccessState !== true && hasSuccess()}\">\n\n  <label\n    class=\"form.labelHtmlClass\"\n    ng-show=\"showTitle()\"\n  >{{form.title}}</label>\n\n  <div  style=\"position: relative;\">\n    <div class=\"input-group\">\n      <div class=\"btn btn-default input-group-addon\"><span class=\" glyphicon glyphicon-calendar\"></span></div>\n      <input\n        class=\"form-control has-feedback {{form.fieldHtmlClass}}\"\n        sf-field-model\n        sf-changed=\"form\"\n        schema-validate=\"form\"\n        ng-model-options=\"{ allowInvalid: true }\"\n        date-time>\n      </input>\n    </div>\n\n    <span\n      ng-if=\"form.feedback !== false\"\n      class=\"form-control-feedback\"\n      ng-class=\"evalInScope(form.feedback) || {'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError() }\"\n      aria-hidden=\"true\"\n    ></span>\n  </div>\n\n  <div\n    class=\"help-block\"\n    sf-message=\"form.description\">\n  </div>\n</div>\n";
window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ })
/******/ ]);
});
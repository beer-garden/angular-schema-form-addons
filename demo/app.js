
// JS
import 'jquery';
import 'objectpath';
import 'tv4';
import 'bootstrap';

import angular from 'angular';
import 'angular-strap';
import 'angular-ui-bootstrap';
import 'angular-sanitize';
import 'angular-cookies';
import 'angular-schema-form-bootstrap';

// CSS
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';

import nullableObject from './aspects/nullable-object';
import dictionary from './aspects/dictionary';
import raw from './aspects/raw';
import regularObject from './aspects/regular-object.js';
import partitionedObject from './aspects/partitioned-object';
import hiddenFields from './aspects/hidden-fields';
import fileUpload from './aspects/file-upload';
import dynamicChoices from './aspects/dynamic-choices';
import complex from './aspects/complex';
import date from './aspects/date';

angular.module('demoApp', [
  'ui.bootstrap',
  'mgcrea.ngStrap',
  'schemaForm',
  'ngCookies',
  'beer-garden.addons',
])
.controller('FormController', ['$scope', '$http', '$cookies',
function($scope, $http, $cookies) {

  // Load a different demo
  $scope.load = function(demoType) {
    $scope.model = {};
    $scope.schema = angular.merge({},
      {"type": "object", "properties": $scope.schemasAndForms[demoType]['schema']}
    );

    $scope.form = [].concat(
      $scope.schemasAndForms[demoType]['form'],
      [{
        "type": "submit",
        "title": "Submit (aka Validate)"
      }]
    );

    $cookies.put('currentDemo', demoType);
  };

  $scope.submitForm = function(form, model) {
    $scope.alerts.splice(0);
    $scope.$broadcast('schemaFormValidate');

    if(!form.$valid) {
      var problem_fields = {};
      angular.forEach(form.$error, function(errorGroup) {
        angular.forEach(errorGroup, function(error) {
          if(error.$name) {
            problem_fields[error.$name] = Object.keys(error.$error);
          }
        });
      });

      if(Object.keys(problem_fields).length > 0) {
        $scope.alerts.push('We found these field errors: ' + JSON.stringify(problem_fields));
      } else {
        $scope.alerts.push("There was an issue validating the form, but we don't know what caused it");
      }
    }
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.$on('sf-render-finished', function() {
    console.log("sf-render-finished");
    $scope.debug = {schema: angular.copy($scope.schema), form: angular.copy($scope.form)};
  });

  $scope.$on('sf-changed', function() {
    console.log("sf-changed");
    $scope.debug = {schema: angular.copy($scope.schema), form: angular.copy($scope.form)};
  });

  $scope.$on('sf-changed-titlemap', function(event, key) {
    console.log("sf-changed-titlemap: " + key);
  });

  $scope.schemasAndForms = {
    'Nullable Object': nullableObject,
    'Dictionary': dictionary,
    'Raw': raw,
    'Regular Object': regularObject,
    'Partitioned Object': partitionedObject,
    'Hidden Fields': hiddenFields,
    'File Upload': fileUpload,
    'Dynamic Choices': dynamicChoices,
    'Complex': complex,
    'Date': date
  };

  try {
    $scope.load($cookies.get('currentDemo'));
  }
  catch(err) {
    $scope.load('Nullable Object');
  }

  $scope.model = {};
  $scope.alerts = [];
  $scope.debug = {schema: angular.copy($scope.schema), form: angular.copy($scope.form)};
}]);

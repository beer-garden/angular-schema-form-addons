import { expect } from "chai";
import { rawDirective } from "./raw.js";

describe("Raw Directive", function () {
  // The rawDirective only exports a default function. It needs to be attached
  // to a module before it can be tested. Normally, it will get attached to
  // the schemaForm module, so we go ahead and attach it here for testing
  const testModule = angular
    .module("rawSpec", [])
    .directive("raw", rawDirective);

  var $compile, $rootScope, customHtml, $scope, element, linker;

  beforeEach(angular.mock.module(testModule.name));
  beforeEach(
    angular.mock.inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;

      $scope = $rootScope.$new();
      $scope.model = {};
      customHtml =
        '<form name="testForm">' +
        '<input name="testValue" ng-model="model.testValue" raw="form" />' +
        "</form>";
      element = angular.element(customHtml);
      linker = $compile(element);
      element = linker($scope);
    })
  );

  describe("formatter", function () {
    it("should set a default view value array into a string", function () {
      $scope.model["testValue"] = [];
      $scope.$digest();

      expect($scope.testForm.testValue.$viewValue).to.equal("[]");
    });

    it("should set a default view value object into a String", function () {
      $scope.model["testValue"] = { foo: "bar" };
      $scope.$digest();

      expect($scope.testForm.testValue.$viewValue).to.equal('{"foo":"bar"}');
    });

    it("should set an integer to a string", function () {
      $scope.model["testValue"] = 1;
      $scope.$digest();

      expect($scope.testForm.testValue.$viewValue).to.equal("1");
    });

    it("should set a boolean to a string", function () {
      $scope.model["testValue"] = true;
      $scope.$digest();

      expect($scope.testForm.testValue.$viewValue).to.equal("true");
    });

    it("should keep a null as a null", function () {
      $scope.model["testValue"] = null;
      $scope.$digest();

      expect($scope.testForm.testValue.$viewValue).to.equal(null);
    });
  }); // End desribe foramtter

  describe("parser", function () {
    it("should convert null to null on a not-required form", function () {
      $scope.form = { required: false };
      $scope.testForm.testValue.$setViewValue(null);
      expect($scope.model.testValue).to.equal(null);
    });

    it("should convert the string 'null' to null", function () {
      $scope.testForm.testValue.$setViewValue("null");
      expect($scope.model.testValue).to.equal(null);
    });

    it("should ignore spaces before and after strings", function () {
      $scope.testForm.testValue.$setViewValue("  null ");
      expect($scope.model.testValue).to.equal(null);
    });

    it("Should reset all current errors on the model", function () {
      $scope.testForm.testValue.$error = { "tv4-302": false };
      $scope.testForm.testValue.$setViewValue("null");
      expect($scope.testForm.testValue.$invalid).to.be.false;
    });

    it("should set the model to invalid if nothing is provided but is reauired", function () {
      $scope.form = { required: true };
      $scope.testForm.testValue.$setViewValue("");
      expect($scope.testForm.testValue.$invalid).to.be.true;
    });

    it("should convert an empty string that is not required to null", function () {
      $scope.form = { required: false };
      $scope.testForm.testValue.$setViewValue("");
      expect($scope.model.testValue).to.be.null;
    });

    it("should convert an empty string that is required to undefined", function () {
      $scope.form = { required: true };
      $scope.testForm.testValue.$setViewValue("");
      expect($scope.model.testValue).to.be.undefined;
    });

    it("should convert the string 'true' to the boolean true", function () {
      $scope.testForm.testValue.$setViewValue("true");
      expect($scope.model.testValue).to.be.true;
    });

    it("should convert the string 'false' to the boolean false", function () {
      $scope.testForm.testValue.$setViewValue("false");
      expect($scope.model.testValue).to.be.false;
    });

    it("should convert an object into an actual object", function () {
      $scope.testForm.testValue.$setViewValue('{"foo": "bar"}');
      expect($scope.model.testValue).to.deep.equal({ foo: "bar" });
    });

    it("should convert an array into an array object", function () {
      $scope.testForm.testValue.$setViewValue("[1,2,3]");
      expect($scope.model.testValue).to.deep.equal([1, 2, 3]);
    });

    it("should set the model to invalid if an invalid object is provided", function () {
      $scope.testForm.testValue.$setViewValue('{"foo":}');
      expect($scope.testForm.testValue.$invalid).to.be.true;
      expect($scope.model.testValue).to.be.undefined;
    });

    it("should set the model to invalid if an invalid array is provided", function () {
      $scope.testForm.testValue.$setViewValue("[1,2");
      expect($scope.testForm.testValue.$invalid).to.be.true;
      expect($scope.model.testValue).to.be.undefined;
    });

    it("should convert a string value correctly", function () {
      $scope.testForm.testValue.$setViewValue('"a"');
      expect($scope.model.testValue).to.equal("a");
    });

    it("should convert a number correct", function () {
      $scope.testForm.testValue.$setViewValue("1");
      expect($scope.model.testValue).to.equal(1);
    });

    it("should set the validity to false if it cannot figure out the type", function () {
      $scope.testForm.testValue.$setViewValue("not_valid_type");
      expect($scope.testForm.testValue.$invalid).to.be.true;
      expect($scope.model.testValue).to.be.undefined;
    });
  }); // end describe parser

  describe("validate", function () {
    it("should trigger the parsing when the schemaFormValidate event fires", function () {
      $scope.testForm.testValue.$setViewValue("[]");
      $scope.$broadcast("schemaFormValidate");
      expect($scope.testForm.testValue.$$lastCommittedViewValue).to.equal("[]");
    });
  });
}); // End Describe Raw Directive

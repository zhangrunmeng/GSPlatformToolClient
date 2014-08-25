'use strict';

describe('Controller: JobcreateCtrl', function () {

  // load the controller's module
  beforeEach(module('gsPlatformToolApp'));

  var JobcreateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JobcreateCtrl = $controller('JobcreateCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

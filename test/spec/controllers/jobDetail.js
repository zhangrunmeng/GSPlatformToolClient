'use strict';

describe('Controller: JobdetailctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('gsPlatformToolApp'));

  var JobdetailctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JobdetailctrlCtrl = $controller('JobDetailCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

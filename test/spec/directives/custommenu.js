'use strict';

describe('Directive: customMenu', function () {

  // load the directive's module
  beforeEach(module('stringDetectorWebClientAngularApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<custom-menu></custom-menu>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the customMenu directive');
  }));
});

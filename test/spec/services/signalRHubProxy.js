'use strict';

describe('Service: signalRHubProxy', function () {

  // load the service's module
  beforeEach(module('gsPlatformToolApp'));

  // instantiate service
  var signalRHubProxy;
  beforeEach(inject(function (_signalRHubProxy_) {
    signalRHubProxy = _signalRHubProxy_;
  }));

  it('should do something', function () {
    expect(!!signalRHubProxy).toBe(true);
  });

});

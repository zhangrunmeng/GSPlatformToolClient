'use strict';

describe('Service: JobDataService', function () {

  // load the service's module
  beforeEach(module('gsPlatformToolApp'));

  // instantiate service
  var JobDataService;
  beforeEach(inject(function (_JobDataService_) {
    JobDataService = _JobDataService_;
  }));

  it('should do something', function () {
    expect(!!JobDataService).toBe(true);
  });

});

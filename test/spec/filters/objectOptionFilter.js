'use strict';

describe('Filter: objectOptionFilter', function () {

  // load the filter's module
  beforeEach(module('gsPlatformToolApp'));

  // initialize a new instance of the filter before each test
  var objectOptionFilter;
  beforeEach(inject(function ($filter) {
    objectOptionFilter = $filter('objectOptionFilter');
  }));

  it('should return the input prefixed with "objectOptionFilter filter:"', function () {
    var text = 'angularjs';
    expect(objectOptionFilter(text)).toBe('objectOptionFilter filter: ' + text);
  });

});

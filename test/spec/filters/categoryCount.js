'use strict';

describe('Filter: categoryCount', function () {

  // load the filter's module
  beforeEach(module('gsPlatformToolApp'));

  // initialize a new instance of the filter before each test
  var categoryCount;
  beforeEach(inject(function ($filter) {
    categoryCount = $filter('categoryCount');
  }));

  it('should return the input prefixed with "categoryCount filter:"', function () {
    var text = 'angularjs';
    expect(categoryCount(text)).toBe('categoryCount filter: ' + text);
  });

});

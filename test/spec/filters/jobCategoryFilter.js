'use strict';

describe('Filter: jogCategoryFilter', function () {

  // load the filter's module
  beforeEach(module('gsPlatformToolApp'));

  // initialize a new instance of the filter before each test
  var jogCategoryFilter;
  beforeEach(inject(function ($filter) {
    jogCategoryFilter = $filter('jogCategoryFilter');
  }));

  it('should return the input prefixed with "jogCategoryFilter filter:"', function () {
    var text = 'angularjs';
    expect(jogCategoryFilter(text)).toBe('jogCategoryFilter filter: ' + text);
  });

});

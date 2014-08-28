'use strict';

/**
 * @ngdoc filter
 * @name gsPlatformToolApp.filter:jogCategoryFilter
 * @function
 * @description
 * # jogCategoryFilter
 * Filter in the gsPlatformToolApp.
 */
angular.module('gsPlatformToolApp')
  .filter('jogCategoryFilter', function (Utility) {
    return function (array,category) {
        if (!angular.isArray(array) ||category==Utility.all) return array;
        var filtered = [];
        for ( var j = 0; j < array.length; j++) {
            var job = array[j];
            if (angular.isDefined(job.Result)&& job.Result == category) {
                filtered.push(job);
            }
        }
      return filtered;
    };
  });

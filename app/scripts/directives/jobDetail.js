'use strict';

/**
 * @ngdoc directive
 * @name gsPlatformToolApp.directive:jobDetail
 * @description
 * # jobDetail
 */
angular.module('gsPlatformToolApp')
  .directive('jobDetail', function () {
    return {
        templateUrl: 'views/partials/jobDetail.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      }
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name gsPlatformToolApp.directive:mainPanel
 * @description
 * # mainPanel
 */
angular.module('gsPlatformToolApp')
  .directive('mainPanel', function () {
    return {
      templateUrl: 'views/main.html',
      restrict: 'E',
      /*controller:'MainCtrl',*/
      link: function postLink(scope, element, attrs) {

          console.log(scope);
      }
    };
  });

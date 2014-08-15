'use strict';

/**
 * @ngdoc directive
 * @name gsPlatformToolApp.directive:subMenu
 * @description
 * # subMenu
 */
angular.module('gsPlatformToolApp')
  .directive('subMenu', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the subMenu directive');
      }
    };
  });

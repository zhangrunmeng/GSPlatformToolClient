'use strict';

/**
 * @ngdoc directive
 * @name gsPlatformToolApp.directive:customMenu
 * @description
 * # customMenu
 */
angular.module('gsPlatformToolApp')
  .directive('customMenu', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the customMenu directive');
      }
    };
  });

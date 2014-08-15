'use strict';

/**
 * @ngdoc directive
 * @name gsPlatformToolApp.directive:recursive
 * @description
 * # recursive
 */
angular.module('gsPlatformToolApp')
    .directive('recursive',['$compile',function($compile) {
        return {
            restrict: 'EACM',
            priority: 100000,
            compile: function (tElement, tAttr) {
                var contents,linkFunc;
                contents = tElement.contents().remove();
                linkFunc = null;
                return function(scope,iElement, iAttr){
                    linkFunc = $compile(contents);
                    linkFunc(scope,function(clonedElement,scope){
                        return  iElement.append(clonedElement);
                    });
                };
            }
        };
    }]);


'use strict';

/**
 * @ngdoc directive
 * @name gsPlatformToolApp.directive:customJobName
 * @description
 * # customJobName
 */
angular.module('gsPlatformToolApp')
  .directive('customJobName', function (Restangular) {
    return {
      require:'ngModel',
      restrict: 'A',
      link: function postLink(scope, element, attrs,ngModel) {


        scope.$watch(function(){return ngModel.$modelValue},function(newValue){
            if(angular.isUndefined(newValue)){
                return;
            }
            console.log("customjobname:"+newValue);
            Restangular.one("validation","custom").post('jobname',{"Input":newValue})
                .then(function(result){
                    ngModel.$setValidity('customJobName',  true);
                }
                ,function(error){
                    ngModel.$setValidity('customJobName',  false);
                });
        });
      }
    };
  });

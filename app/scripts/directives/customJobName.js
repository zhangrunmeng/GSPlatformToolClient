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
      link: function postLink(scope, element, attrs,ngModelController) {


        scope.$watch(function(){return ngModelController.$modelValue},function(newValue){
            if(angular.isUndefined(newValue)){
                return;
            }
            console.log("customjobname:"+newValue);
            Restangular.one("validation","custom").post('jobname',{"Input":newValue})
                .then(function(result){
                    ngModelController.$setValidity('customJobName',  true);
                }
                ,function(error){
                    ngModelController.$setValidity('customJobName',  false);
                });
        });
      }
    };
  });

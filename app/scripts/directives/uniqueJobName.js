'use strict';

/**
 * @ngdoc directive
 * @name gsPlatformToolApp.directive:uniqueJobName
 * @description
 * # uniqueJobName
 */
angular.module('gsPlatformToolApp')
  .directive('uniqueJobName', function (Restangular) {
        return {
            require:'ngModel',
            restrict: 'A',
            link: function postLink(scope, element, attrs,ngModelController) {
                scope.$watch(function(){return ngModelController.$modelValue},function(newValue){
                    if(angular.isUndefined(newValue)||!ngModelController.$error.customJobName){
                        return;
                    }
                    console.log("uniquejobname:"+newValue);
                    Restangular.one("validation","jenkins").post("jobname",{"Input":newValue})
                        .then(function(result){
                            ngModelController.$setValidity('uniqueJobName', ( result['Type'] == 'ok' ) ? true : false);
                        }
                        ,function(error){
                            console.log(error);
                            ngModelController.$setValidity('uniqueJobName',  false);
                        });
                });
            }
        };
    });


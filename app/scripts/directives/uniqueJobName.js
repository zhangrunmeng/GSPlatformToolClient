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
            link: function postLink(scope, element, attrs,ngModel) {
                scope.$watch(function(){return ngModel.$modelValue},function(newValue){
                    if(angular.isUndefined(newValue)||!ngModel.$error.customJobName){
                        return;
                    }
                    console.log("uniquejobname:"+newValue);
                    Restangular.one("validation","jenkins").post("jobname",{"Input":newValue})
                        .then(function(result){
                            ngModel.$setValidity('uniqueJobName', ( result['Type'] == 'ok' ) ? true : false);
                        }
                        ,function(error){
                            console.log(error);
                            ngModel.$setValidity('uniqueJobName',  false);
                        });
                });
            }
        };
    });


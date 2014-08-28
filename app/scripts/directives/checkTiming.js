'use strict';

/**
 * @ngdoc directive
 * @name gsPlatformToolApp.directive:checkTiming
 * @description
 * # checkTiming
 */
angular.module('gsPlatformToolApp')
  .controller('checkTimingCtrl',function($scope){
        $scope.message ="The timing input is invalid";
    })
  .directive('checkTiming', function (Restangular) {
        return {
            require:'ngModel',
            restrict: 'A',
            controller:'checkTimingCtrl',
            link: function postLink(scope, element, attrs,ngModelController) {
                scope.$watch(function(){return ngModelController.$modelValue},function(newValue,oldValue){
                    if(angular.isUndefined(oldValue)||angular.isUndefined(newValue)){
                        return;
                    }
                    console.log("checkTiming:"+newValue);
                    Restangular.one("validation","jenkins").post('timing',{"Input":newValue})
                        .then(function(result){
                             scope.message = result['Message'];
                            ngModelController.$setValidity('checkTiming',  ( result['Type'] == 'ok' ) ? true : false);
                        }
                        ,function(error){
                            ngModelController.$setValidity('checkTiming',  false);
                        });
                });
            }
        };
    });



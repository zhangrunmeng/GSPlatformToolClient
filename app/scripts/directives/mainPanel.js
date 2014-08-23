'use strict';

/**
 * @ngdoc directive
 * @name gsPlatformToolApp.directive:mainPanel
 * @description
 * # mainPanel
 */
angular.module('gsPlatformToolApp')
  .directive('mainPanel', function ($window,Utility) {
    return {
      templateUrl: 'views/main.html',
      restrict: 'E',
      /*controller:'MainCtrl',*/
      link: function postLink(scope, element, attrs) {
          // mode changed according window width , will trigger dynamic columns hide and show
          scope.onResize= function (){
             var jobsTable = angular.element("table[ng-Table='jobTableParams']");
             var tableWrapper = jobsTable.parent();
              var oldMode = scope.mode;
              if(tableWrapper.width()<jobsTable.width()||jobsTable.width()<320){

                  scope.mode =Utility.ModeEnum.extraSmall;
              }else if(jobsTable.width()<420) {
                  scope.mode = Utility.ModeEnum.small;
              }
              else if(jobsTable.width()<630){
                  scope.mode = Utility.ModeEnum.medium;
              }else {
                  scope.mode = Utility.ModeEnum.large;
              }
              if(angular.isDefined(oldMode)&&scope.mode!=oldMode){
                  scope.$apply();
              }
          };
          angular.element($window).bind('resize',function(){
              scope.onResize();
          });
          scope.$watch('$viewContentLoaded', function() {
              scope.onResize();
              scope.loadJobsData();
          });

      }
    };
  });

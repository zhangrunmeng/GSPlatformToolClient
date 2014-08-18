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
     /* controller:'MainCtrl',*/
      link: function postLink(scope, element, attrs) {
          // trigger datatables filter;
          scope.oTableFilter = function(topJobFilter){
              console.log(topJobFilter);
          };

          // category update
          scope.categoryAllClick = function(){
              console.log('category all');
          };
          scope.categoryCreatedClick = function(){
              console.log('category created');
          };
          scope.categoryRunningClick = function(){
              console.log('category running');
          };
          scope.categoryCompleteClick = function(){
              console.log('category complete');
          };

          // create job click
          scope.createJobClick = function(){
              console.log('create job button');
          };

          // top job tool bar
          scope.batchJobStartClick = function(){
              console.log('top job start click');
          };
          scope.batchJobStopClick = function(){
              console.log('top job stop click');
          };
          scope.batchJobDeleteClick = function() {
              console.log('top job delete click');
          };
          console.log(scope);
      }
    };
  });

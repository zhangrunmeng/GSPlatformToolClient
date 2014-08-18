'use strict';

/**
 * @ngdoc function
 * @name stringDetectorWebClientAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stringDetectorWebClientAngularApp
 */
angular.module('gsPlatformToolApp')
  .controller('MainCtrl', function ($scope) {



    console.log($scope);
  });




angular.module('gsPlatformToolApp')
.factory('utils',function(){
        // job status
        var running="Running";
        var created="Created";
        var completed="Completed";
        // jenkins ballcolor  map
        var buildStatusMap ={"Failed":completed,
            "InProgress":running,
            "Unstable":completed,
            "Success":completed,
            "Pending":completed,
            "Disabled":completed,
            "Aborted":completed,
            "NotBuilt":created
        };

        return {
            BuildStatusMap : buildStatusMap
        };
    });
'use strict';

/**
 * @ngdoc overview
 * @name stringDetectorWebClientAngularApp
 * @description
 * # stringDetectorWebClientAngularApp
 *
 * Main module of the application.
 */
angular
  .module('gsPlatformToolApp', [
    'restangular','datatables'
  ]).constant('serviceUrl','http://vhwebdevserver.eng.citrite.net')
    .config(function(RestangularProvider,serviceUrl){
        RestangularProvider.setBaseUrl(serviceUrl+'/api/');
    });


angular.module('gsPlatformToolApp')
    .factory('Utility',function(){
        // job status
        var running="Running";
        var created="Created";
        var completed="Completed";
        var validationJobName ='validation';
        var toolName ='faketool';
        // jenkins ball color  map
        var buildStatusMap ={"Failed":completed,
            "InProgress":running,
            "Unstable":completed,
            "Success":completed,
            "Pending":completed,
            "Disabled":completed,
            "Aborted":completed,
            "NotBuilt":created
        };

        // menu option
        var menuOption ={
            accordion : 'true',
            speed : 200,
            closedSign : '[+]',
            openedSign : '[-]'
        };


        return {
            BuildStatusMap : buildStatusMap,
            ValidationJob  : validationJobName,
            ToolName : toolName,
            MenuOption : menuOption
        };
    });
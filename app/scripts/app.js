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
    'restangular','ngTable'
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

        // page group
        var pageGroup='#page-group';
        var dtJob='#dt_job';
        var dtJobInfo ='#dt_job_info';
        var dtJobPaginate ='#dt_job_paginate';


        return {

            BuildStatusMap : buildStatusMap,
            ValidationJob  : validationJobName,
            ToolName : toolName,
            MenuOption : menuOption,
            pageGroup: pageGroup,
            dtJob : dtJob,
            dtJobInfo : dtJobInfo,
            dtJobPaginate : dtJobPaginate,
            created: created,
            running:running,
            completed:completed
        };
    });
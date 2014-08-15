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
    'ngResource'
  ]).config(['$logProvider',function($logProvider){
        $logProvider.debugEnabled(true);

    }]);

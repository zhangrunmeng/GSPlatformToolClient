'use strict';

/**
 * @ngdoc function
 * @name stringDetectorWebClientAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stringDetectorWebClientAngularApp
 */
angular.module('gsPlatformToolApp')
  .controller('MainCtrl', function ($scope,Restangular,DTOptionsBuilder,DTColumnDefBuilder,Utility) {
    $scope.loadToolJobs = function(){
        Restangular.all('tools').one(Utility.ToolName).get({fields:'toolname,viewname,jobs(jobname,status)'}).then(function (toolData){

            toolData.Jobs.forEach(function(job){
                job.Result = Utility.BuildStatusMap[job.Status.Status];
            });
            $scope.jobs = toolData.Jobs.filter(function(job){
                return job.JobName!= Utility.ValidationJob;
            });


        });
    };

    $scope.dtJobOptions  = {
        sPaginationType : "bootstrap_two_button",
        sDom:'tip',
        iDisplayLength:15,
        bAutoWidth: false,
        oLanguage:{
            sInfo:'Showing _START_ to _END_ of total _TOTAL_ Jobs',
            sInfoFiltered: ""
        },
        fnDrawCallback: function (oSettings) {
            // have no other way to  manipulate dom  in the custom directive .
            $(Utility.dtJobInfo).appendTo($(Utility.pageGroup));
            $(Utility.dtJobInfo).addClass("pull-right margin-right margin-top");
            $(Utility.dtJobPaginate).prependTo($(Utility.pageGroup))
        }

    };

    $scope.dtJobColumnDefs = [
        {
        "aTargets" : [0],
        "bSortable": false,
        "bSearchable": false,
        "bVisible": false
        },
        {"aTargets" : [4],
        "bSortable": false,
        "bSearchable": false,
        "bVisible": false
        }];

    $scope.$on('event:dataTableLoaded', function(event, loadedDT) {
        $scope.jobTable = loadedDT;

        console.log('job loaded');
    });

    // trigger datatables filter;
    $scope.oTableFilter = function(topJobFilter){
        $scope.jobTable.tableObject.fnFilter(topJobFilter);
    };

    // category update
    $scope.categoryAllClick = function(){
        // clear the filter on the third column
        $scope.jobTable.tableObject.fnFilter('',3);
        $scope.jobTable.tableObject.fnFilter('');
    };
    $scope.categoryCreatedClick = function(){
        $scope.jobTable.tableObject.fnFilter('',3,true);
        $scope.jobTable.tableObject.fnFilter(Utility.created, 3,true);
    };
    $scope.categoryRunningClick = function(){
        $scope.jobTable.tableObject.fnFilter('',3,true);
        $scope.jobTable.tableObject.fnFilter(Utility.running, 3,true);
    };
    $scope.categoryCompleteClick = function(){
        $scope.jobTable.tableObject.fnFilter('',3,true);
        $scope.jobTable.tableObject.fnFilter(Utility.completed, 3,true);
    };

    // create job click
    $scope.createJobClick = function(){
        console.log('create job button');
    };

    // top job tool bar
    $scope.batchJobStartClick = function(){
        console.log('top job start click');
    };
    $scope.batchJobStopClick = function(){
        console.log('top job stop click');
    };
    $scope.batchJobDeleteClick = function() {
        console.log('top job delete click');
    };
    $scope.loadToolJobs();
    console.log($scope);
  });





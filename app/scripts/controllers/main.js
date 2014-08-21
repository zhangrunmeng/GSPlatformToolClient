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
    
    // all kinds of category jobs count
    $scope.category ={
        'totalJobsNum':0,
        'createdJobsNum':0,
        'runningJobsNum':0,
        'completedJobsNum':0
        };
    $scope.selectedCategory= Utility.defaultCategory;
    var updateCategory = function (){
        // category item numbers
        var totalJobsNum=0;
        var createdJobsNum=0;
        var runningJobsNum=0;
        var completedJobsNum=0;
        var jobs=$scope.jobs;
        if(jobs){
            //compute the all categories jobs num
            totalJobsNum=jobs.length;
            $.each(jobs,function(i,job){
                switch (job.Result){
                    case Utility.created:
                        createdJobsNum++;
                        break;
                    case Utility.running:
                        runningJobsNum++;
                        break;
                    case Utility.completed :
                        completedJobsNum++;
                        break;
                }
            });
        }
        $scope.category.totalJobsNum= totalJobsNum;
        $scope.category.createdJobsNum = createdJobsNum;
        $scope.category.runningJobsNum = runningJobsNum;
        $scope.category.completedJobsNum = completedJobsNum;
    }
       
        
    var loadToolJobs = function(){
        Restangular.all('tools').one(Utility.ToolName).get({fields:'toolname,viewname,jobs(jobname,status)'}).then(function (toolData){

            toolData.Jobs.forEach(function(job){
                job.Result = Utility.BuildStatusMap[job.Status.Status];
            });
            $scope.jobs = toolData.Jobs.filter(function(job){
                return job.JobName!= Utility.ValidationJob;
            });
            updateCategory();

        });
    };


    // job datatable option
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
    $scope.jobTableFilter = function(topJobFilter){
        $scope.jobTable.tableObject.fnFilter(topJobFilter);
    };

    // category update
    $scope.switchCategory = function(category){
        $scope.selectedCategory = category;
        switch (category){
            case Utility.all:
                $scope.jobTable.tableObject.fnFilter('',3);
                $scope.jobTable.tableObject.fnFilter('');
                break;
            case Utility.created:
                $scope.jobTable.tableObject.fnFilter('',3,true);
                $scope.jobTable.tableObject.fnFilter(Utility.created, 3,true);
                break;
            case Utility.running:
                $scope.jobTable.tableObject.fnFilter('',3,true);
                $scope.jobTable.tableObject.fnFilter(Utility.running, 3,true);
                break;
            case Utility.completed:
                $scope.jobTable.tableObject.fnFilter('',3,true);
                $scope.jobTable.tableObject.fnFilter(Utility.completed, 3,true);
                break;
        }
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
    loadToolJobs();
    console.log($scope);
  });





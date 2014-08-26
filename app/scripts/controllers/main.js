'use strict';

/**
 * @ngdoc function
 * @name stringDetectorWebClientAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stringDetectorWebClientAngularApp
 */
angular.module('gsPlatformToolApp')
  .controller('MainCtrl', function ($scope,$rootScope,$filter,Restangular,ngTableParams,Utility) {

    // all kinds of category jobs count
    $scope.selectedCategory= Utility.defaultCategory;
    // category update
    $scope.$watch("selectedCategory", function () {
        if(angular.isDefined($scope.jobTableParams)){
            $scope.jobTableParams.reload();
        }
    });

    // init scope jobs data
    $scope.jobFilter='';
    $scope.$watch("jobFilter", function () {
        if(angular.isDefined($scope.jobTableParams)){
            $scope.jobTableParams.reload();
        }
    });

    $scope.isSelected = function(job){
        return $scope.selectedJob===job;
    };
    $scope.setSelected = function(job){
        $scope.selectedJob =job;
    }
    // selected Job
    $scope.$watch('selectedJob',function(newValue,oldValue){
        if(angular.isUndefined(newValue)){
            return;
        }
        // the first time set value or new selection
        if(angular.isUndefined(oldValue)||newValue.JobName !=oldValue.JobName){
            $scope.$broadcast('beginJobLoad',newValue);
        }
    });

    // on job setting, configuration,builds,report added
    $scope.$on('addJobSetting',function(event,jobName,Setting){
       var toChangeJob =  $filter('filter')($scope.jobs,{JobName:jobName})[0];
       var changeIndex = $scope.jobs.indexOf(toChangeJob);
       $scope.jobs[changeIndex].Setting = Setting;
       console.log($scope.jobs[changeIndex]);
    });

    $scope.$on('addJobConfiguration',function(event,jobName,Configuration){
        var toChangeJob =  $filter('filter')($scope.jobs,{JobName:jobName})[0];
        var changeIndex = $scope.jobs.indexOf(toChangeJob);
        $scope.jobs[changeIndex].Configuration = Configuration;
        console.log($scope.jobs[changeIndex]);
    });

    $scope.$on('addJobBuilds',function(event,jobName,Builds){
        var toChangeJob =  $filter('filter')($scope.jobs,{JobName:jobName})[0];
        var changeIndex = $scope.jobs.indexOf(toChangeJob);
        $scope.jobs[changeIndex].Builds = Builds;
        console.log($scope.jobs[changeIndex]);
    });

    $scope.$on('addJobReport',function(event,jobName,Report){
        var toChangeJob =  $filter('filter')($scope.jobs,{JobName:jobName})[0];
        var changeIndex = $scope.jobs.indexOf(toChangeJob);
        $scope.jobs[changeIndex].Report = Report;
        console.log($scope.jobs[changeIndex]);
    });

     // on jobs table data reloaded
    $scope.$on('ngTableAfterReloadData',function(event,$data){
        /*if($data.length>0 && angular.isUndefined($scope.selectedJob)){
            $scope.selectedJob =$data[0];
        }*/
    });

    $rootScope.$on('createNewJob',function(event,data){
        $scope.jobs.push(data);
        $scope.jobTableParams.reload();
    });
    $scope.loadJobsData = function(){
        Restangular.one('tools',Utility.ToolName).get({fields:'toolname,viewname,jobs(jobname,status)'})
            .then(function (toolData){
                toolData.Jobs.forEach(function(job){
                    job.Result = Utility.BuildStatusMap[job.Status.Status];
                });
                $scope.jobs = toolData.Jobs.filter(function(job){
                    return job.JobName!= Utility.ValidationJob;
                });
                $scope.selectedJob= $scope.jobs[0];
               // data=[{JobName:'1',Result:'3'},{JobName:'2',Result:'1'},{JobName:'3',Result:'4'},{JobName:'1',Result:'2'}]
                },function(err){
                console.log(err);
            }).then(function(){
                // ng-table jobs table
                $scope.jobTableParams = new ngTableParams(
                    {
                        page:1, // first page number
                        count:15, // count per page
                        sorting: {
                            JobName:'asc'     // initial sorting
                        }
                    },
                    {   $scope:$scope,
                        showDefaultPagination:false,
                        counts: [], // hide the page size
                        getData: function($defer , params){
                            $scope.category = $filter('categoryCount')($scope.jobs);
                            var categoryData = $filter('jogCategoryFilter')($scope.jobs,$scope.selectedCategory);
                            var filteredData = $filter('objectOptionFilter')(categoryData,{JobName:"",Status:{Status:""},Result:""},$scope.jobFilter);
                            // set total item size
                            params.total(filteredData.length);
                            var orderedData = params.sorting() ?
                                $filter('orderBy')(filteredData, params.orderBy()) :
                                filteredData;
                            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        }
                    }
                );
            });
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


    });





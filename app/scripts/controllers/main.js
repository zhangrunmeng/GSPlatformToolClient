'use strict';

/**
 * @ngdoc function
 * @name stringDetectorWebClientAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stringDetectorWebClientAngularApp
 */
angular.module('gsPlatformToolApp')
  .controller('MainCtrl', function ($scope,$filter,Restangular,ngTableParams,Utility) {

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

    var loadJobsData = function(){
        Restangular.all('tools').one(Utility.ToolName).get({fields:'toolname,viewname,jobs(jobname,status)'})
            .then(function (toolData){
                toolData.Jobs.forEach(function(job){
                    job.Result = Utility.BuildStatusMap[job.Status.Status];
                });
                $scope.jobs = toolData.Jobs.filter(function(job){
                    return job.JobName!= Utility.ValidationJob;
                });
               // data=[{JobName:'1',Result:'3'},{JobName:'2',Result:'1'},{JobName:'3',Result:'4'},{JobName:'1',Result:'2'}]
                },function(err){
                console.log(err);
            }).then(function(){
                // ng-table jobs table
                console.log('transfer params');
                $scope.jobTableParams = new ngTableParams(
                    {
                        page:1, // first page number
                        count:15, // count per page
                        sorting: {            // initial sorting
                        }
                    },
                    {   $scope:$scope,
                        showDefaultPagination:false,
                        counts: [], // hide the page size
                        total: $scope.jobs.length ,
                        getData: function($defer , params){
                            $scope.category = $filter('categoryCount')($scope.jobs);
                            var categoryData = $filter('jogCategoryFilter')($scope.jobs,$scope.selectedCategory);
                            var filteredData = $filter('objectOptionFilter')(categoryData,{JobName:"",Status:{Status:""},Result:""},$scope.jobFilter);
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
    loadJobsData();
  });





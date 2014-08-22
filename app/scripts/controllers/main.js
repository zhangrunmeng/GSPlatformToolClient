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


    // init scope jobs data
    $scope.jobFilter='';
    /*var getFilter = function (){
            var filter = $scope.
        }*/
    $scope.loadJobsData = function(){
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
                            var filteredData = $filter('filter')($scope.jobs,$scope.jobFilter);
                            var orderedData = params.sorting() ?
                                $filter('orderBy')(filteredData, params.orderBy()) :
                                filteredData;
                            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        }
                    }
                );
            });

    };


    // trigger datatables filter;
    $scope.oTableFilter = function(topJobFilter){
        $scope.jobTable.tableObject.fnFilter(topJobFilter);
    };

    // category update
    $scope.categoryAllClick = function(){
        $scope.jobTableParams.data.pop();
        //console.log($scope.jobs);
        $scope.jobTableParams.reload();
        // clear the filter on the third column
        /*$scope.jobTable.tableObject.fnFilter('',3);
        $scope.jobTable.tableObject.fnFilter('');*/
    };
    $scope.categoryCreatedClick = function(){
        $scope.jobs.push({"JobName":"Product-version-component-testtag-faketool","Status":{"JobName":"Product-version-component-testtag-faketool","Status":"Success"}});
       /* $scope.jobTable.tableObject.fnFilter('',3,true);
        $scope.jobTable.tableObject.fnFilter(Utility.created, 3,true);*/
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
    $scope.loadJobsData();
    console.log($scope);
  });





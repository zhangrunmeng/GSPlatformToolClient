'use strict';

/**
 * @ngdoc function
 * @name stringDetectorWebClientAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stringDetectorWebClientAngularApp
 */
angular.module('gsPlatformToolApp')
  .controller('MainCtrl', function ($scope,$rootScope,$filter,Restangular,ngTableParams,signalRHubProxy,serviceUrl,serviceUrl2,Utility) {
    var jobHubProxy = signalRHubProxy(serviceUrl2,'jobHub',{logging:true});

    // all kinds of category jobs count
    $scope.selectedCategory= Utility.defaultCategory;
    // category update
    $scope.$watch("selectedCategory", function () {
        if(angular.isDefined($scope.jobTableParams)){
            $scope.jobTableParams.reload();
        }
    });
     // init jobs data
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
    // a global filter for jobs
    $scope.jobFilter='';
    $scope.$watch("jobFilter", function () {
        if(angular.isDefined($scope.jobTableParams)){
            $scope.jobTableParams.reload();
        }
    });

     //sigle select job to show detail info
    $scope.isSelected = function(job){
        return $scope.selectedJob===job;
    };
    $scope.setSelected = function(job,$event){
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

    // multple selections
    $scope.selections=[];
    $scope.toggleSelection = function(job){
        var index = $scope.selections.indexOf(job);
        if(index>-1){
            $scope.selections.splice(index,1);
        }else{
            $scope.selections.push(job);
        }
    };

     // on jobs table data reloaded
    $scope.$on('ngTableAfterReloadData',function(event,$data){
        /*if($data.length>0 && angular.isUndefined($scope.selectedJob)){
            $scope.selectedJob =$data[0];
        }*/
    });


    /*$scope.$watch('jobs',function(newValue,oldValue){
      if(angular.isUndefined(oldValue)||angular.isUndefined(newValue)){
          return;
      };
      if(newValue.length!=oldValue.length){
          $scope.jobTableParams.reload();
      }
    });*/

    // create job call back
    $rootScope.$on('createNewJob',function(event,data){
        $scope.jobs.push(data);
        $scope.jobTableParams.reload();
    });

    // job setting update  call back
    $scope.$on('upstreamProjectSettingUpdate',function(event,upstreamProjectName,updateSetting,excludeJobName){
        $filter('filter')($scope.jobs,
            function(item){

               if(angular.isUndefined(item.Setting)){
                   return false;
               }
               var shallUpdate =item.Setting.JobName==upstreamProjectName&&item.JobName!=excludeJobName;
                if(shallUpdate){
                    item.Setting = updateSetting;
                }
               return shallUpdate;
           });
    });


    // top job tool bar
    $scope.jobStart = function(jobs){
        angular.forEach(jobs,function(job){
            Restangular.one('jobs',job.JobName).post('start',null,{fields:'status'})
                .then(function(jobData){

                        job.Status=jobData.Status;
                        job.Result=Utility.BuildStatusMap[job.Status.Status];
                        if(angular.isUndefined(job.Report)){
                            job.Report={JobName:job.JobName,Report:""};
                        }else{
                            job.Report.Report="";
                        }
                        $scope.jobTableParams.reload();
                        $scope.invokeFetchJobReport(job.JobName);
                        if(job==$scope.selectedJob){
                            $scope.$broadcast('beginJobStart');
                        }
                });
        });
    };

    $scope.jobStop = function(jobs){
        angular.forEach(jobs,function(job){
            Restangular.one('jobs',job.JobName).one('stop').remove({fields:'status'})
                .then(function(jobData){
                    job.Status=jobData.Status;
                    job.Result=Utility.BuildStatusMap[job.Status.Status];
                    $scope.jobTableParams.reload();
                });
        });
    };

    $scope.jobDelete = function(jobs) {
       angular.forEach(jobs,function(job){
           Restangular.one('jobs',job.JobName).remove()
               .then(function(jobName){
                 var removeIndex= $scope.jobs.indexOf(job);
                 $scope.jobs.splice(removeIndex,1);
                 $scope.jobTableParams.reload();
               });
       });
    };

    // fetch Job Report
    $scope.invokeFetchJobReport = function(jobName){
       jobHubProxy.invoke('fetchJobReport',jobName);
    };
    jobHubProxy.on('appendReport',function(jobName,report){
       var updateJob=  $filter('filter')($scope.jobs,{JobName:jobName})[0];
       updateJob.Report.Report+=report;
       if($scope.selectedJob.JobName==jobName){
           $scope.$broadcast('scrollReport');
       };

    });
    jobHubProxy.on('updateReportCallback',function(jobName){
        Restangular.one('jobs',jobName).get({fields:'builds,status,report'})
            .then(function(jobData){
               var updateJob= $filter('filter')($scope.jobs,{JobName:jobName})[0];
                updateJob.Status=jobData.Status;
                updateJob.Result=Utility.BuildStatusMap[jobData.Status.Status];
                updateJob.Builds=jobData.Builds;
                updateJob.Report=jobData.Report;
                $scope.$broadcast('afterJobStop');
            });
    });
});





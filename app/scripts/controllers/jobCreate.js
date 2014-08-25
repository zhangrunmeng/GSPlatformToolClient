'use strict';

/**
 * @ngdoc function
 * @name gsPlatformToolApp.controller:JobcreateCtrl
 * @description
 * # JobcreateCtrl
 * Controller of the gsPlatformToolApp
 */
angular.module('gsPlatformToolApp')
  .controller('JobCreateCtrl', function ($scope ,$modal,Restangular) {
    $scope.openModal =function(size){
        Restangular.all('views').one('SRC').get({fields:'jobs(jobname)'})
            .then(function(viewData){
                $scope.srcJobs = viewData.Jobs;
            })
            .then(function(){
                var modalInstance =$modal.open({
                    templateUrl: 'views/partials/createJobModal.html',
                    controller: ModalInstanceCtrl,
                    size: size,
                    resolve: {
                        srcJobs: function () {
                         return $scope.srcJobs;
                         }
                    }
                });
            });
    };
  });

var ModalInstanceCtrl = function ($scope, $modalInstance,srcJobs) {



    $scope.srcJobs = srcJobs;
    $scope.ok = function () {
       // $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};
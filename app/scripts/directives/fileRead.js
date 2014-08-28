'use strict';

/**
 * @ngdoc directive
 * @name gsPlatformToolApp.directive:fileRead
 * @description
 * # fileRead
 */
angular.module('gsPlatformToolApp')
  .directive('fileRead', function () {
    return {
      template: '<a href="#" title="upload" ><i class="fa fa-upload" ></i></a><input type="file"  class="hide"  >',

      restrict: 'E',
      link: function postLink(scope, element, attrs) {

          scope.triggerUpload = function(event){

              if(event.target==element.find('i')[0]){
                 element.find('input[type=file]').trigger('click');
              }
          };
          scope.changeConfigFile = function(event){
             // var fileChoose = $(this);
              if (window.File && window.FileReader && window.FileList && window.Blob) {
                  var file = event.target.files[0];
                  var reader = new FileReader();
                  reader.onload = function(e){
                      var contents = e.target.result;

                      scope.$emit('changeConfigContent',contents);
                     // fileChoose.prev().val(contents);
                  }
                  reader.readAsText(file);
              } else {
                  alert('The File APIs are not fully supported by your browser.');
              }
          };
          element.find('i').bind('click',scope.triggerUpload);
          element.find('input[type=file]').bind('change',scope.changeConfigFile);
      }
    };
  });

/**
 * Create with IntelliJ IDEA
 * Project name : message-gatway-frontend
 * Package name :
 * Author : qinxiangyu
 * User : qxy
 * Date : 17-10-11
 * Time : 下午1:23
 * ---------------------------------
 *
 */

(function(){
    'use strict'

    angular.module('BlurAdmin.pages.producer.list')
        .controller('ProducerListCtrl', ProducerListCtrl);

    /** @ngInject */
    function ProducerListCtrl($scope, $http, toastr, cfpLoadingBar) {
        $scope.tablePageSize = 10;
        $scope.param = {"page":1,"page_size":$scope.tablePageSize};
        $scope.data = {};
        $scope.all = {};

        $scope.queryProducer = function () {
            cfpLoadingBar.start();
            var url = "/api/video?page=" + ($scope.param.page || "") +
                "&page_size=" + ($scope.param.page_size || "") +
                "&batch_no=" + ($scope.param.batch_no || "") +
                "&video_id=" + ($scope.param.video_id || "") +
                "&status=" + ($scope.param.status || "");
            $http.get(url).success(function(resp){
                if(resp.success){
                    $scope.data = resp.data;
                } else {
                    toastr.error(resp.message);
                }
                cfpLoadingBar.complete();
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
                cfpLoadingBar.complete();
            });

        };

        $scope.queryBtn = function(){
            $scope.param.page = 1;
            $scope.queryProducer();
        };
        $scope.queryProducer();
        
        $scope.retry = function (id) {
            var url = "/api/video/retry?id="+id;
            $http.get(url).success(function(resp){
                if(resp.success){
                    toastr.success('重试中!');
                    $scope.queryProducer();
                } else {
                    toastr.error(resp.message);
                }
                cfpLoadingBar.complete();
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
                cfpLoadingBar.complete();
            });
        }

        $scope.queryAll = function () {
            cfpLoadingBar.start();
            var url = "/api/video/all?batch_no=" + ($scope.param.batch_no || "") +
                "&video_id=" + ($scope.param.video_id || "") +
                "&status=" + ($scope.param.status || "");
            $http.get(url).success(function(resp){
                if(resp.success){
                    $scope.all = resp.data;
                } else {
                    toastr.error(resp.message);
                }
                cfpLoadingBar.complete();
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
                cfpLoadingBar.complete();
            });

        };

        $scope.delete = function (id) {
            var url = "/api/video/remove?id="+id;
            $http.get(url).success(function(resp){
                if(resp.success){
                    toastr.success('删除成功!');
                    $scope.queryProducer();
                } else {
                    toastr.error(resp.message);
                }
                cfpLoadingBar.complete();
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
                cfpLoadingBar.complete();
            });
        }
        
    };
    
    

})();
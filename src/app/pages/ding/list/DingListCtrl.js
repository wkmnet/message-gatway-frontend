/**
 * Create with IntelliJ IDEA
 * Project name : blur-admin-1.2.0
 * Package name :
 * Author : Wukunmeng
 * User : wukm
 * Date : 17-7-20
 * Time : 上午11:31
 * ---------------------------------
 *
 */
(function(){
    'use strict'

    angular.module('BlurAdmin.pages.ding.list')
        .controller('DingListCtrl', DingListCtrl);

    /** @ngInject */
    function DingListCtrl($scope, $http, toastr,cfpLoadingBar,commonService) {
        $scope.tablePageSize = 5;
        $scope.param = {"page":1,"page_size":$scope.tablePageSize};

        $scope.data = {};

        $scope.queryDing = function () {
            cfpLoadingBar.start();
            var url = "/api/ding?page=" + ($scope.param.page || "") + 
                "&page_size=" + ($scope.param.page_size || "") +
                "&ding_no=" + ($scope.param.ding_no || "") + 
                "&group_name=" + ($scope.param.group_name || "") + 
                "&robot_name=" + ($scope.param.robot_name || "");
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
            $scope.queryDing ();
        }
        
        $scope.queryDing ();

        $scope.delete = function(id,name){
            commonService.confirm($scope,'确认对话框','您确定要删除 ' + name +' 钉钉吗？').then(function(result){
                console.log("result...",result);
                if(result == 'ok'){
                    $scope.deleteDing (id);
                }
            });
        };
        $scope.deleteDing = function (id) {
            $http.delete("/api/ding/" + id).success(function(resp){
                if(resp.success){
                    toastr.success('数据删除成功!');
                    $scope.queryDing();
                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });
        };
        
    }

})();
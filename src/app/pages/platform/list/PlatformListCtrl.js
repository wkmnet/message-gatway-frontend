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

    angular.module('BlurAdmin.pages.platform.list')
        .controller('PlatformListCtrl', PlatformListCtrl);

    /** @ngInject */
    function PlatformListCtrl($scope, $http, toastr,cfpLoadingBar,commonService) {
        $scope.tablePageSize = 5;
        $scope.param = {"page":1,"page_size":$scope.tablePageSize};

        $scope.data = {};

        $scope.queryPlatform = function () {
            cfpLoadingBar.start();
            var url = "/api/platform?page=" + ($scope.param.page || "") + 
                "&page_size=" + ($scope.param.page_size || "") +
                "&platform_no=" + ($scope.param.platform_no || "") + 
                "&platform_name=" + ($scope.param.platform_name || "") + 
                "&status=" + ($scope.param.status || "");
            $http.get(url).success(function(resp){
                if(resp.success){
                    $scope.data = resp.data;
                    //$scope.createBtn();
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
            $scope.queryPlatform ();
        }
        
        $scope.queryPlatform ();

        $scope.delete = function(id,name){
            commonService.confirm($scope,'确认对话框','您确定要删除 ' + name +' 平台吗？').then(function(result){
                console.log("result...",result);
                if(result == 'ok'){
                    $scope.deletePlatform (id);
                }
            });
        };
        $scope.deletePlatform = function (id) {
            $http.delete("/api/platform/" + id).success(function(resp){
                if(resp.success){
                    toastr.success('数据删除成功!');
                    $scope.queryPlatform();
                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });
        };

        $scope.switchStatus = function(id,status){
            console.log("id:",id);
            console.log("status",status);
            $http.put("/api/platform/" + id,{"status":status}).success(function(response){
                if(response.success){
                    $scope.queryPlatform ();
                }else{
                    toastr.error(response.message)
                }
            }).error(function(resp,status){
                console.log("status",status);
                toastr.error(resp);
            });

        };

        $scope.getPlatformNo = function(){
            $http.get("/api/platform/getPlatformNo").success(function(response){
                if(response.success){
                    $scope.platform.platform_no=response.data;
                }else{
                    toastr.error(response.message)
                }

            }).error(function(resp,status){
                console.log("status",status);
                toastr.error(resp);
            });
        };
        
    }

})();
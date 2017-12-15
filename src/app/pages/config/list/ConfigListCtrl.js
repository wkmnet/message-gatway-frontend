/**
 *
 */
(function(){
    'use strict'

    angular.module('BlurAdmin.pages.config.list')
        .controller('ConfigListCtrl', ConfigListCtrl);


    function ConfigListCtrl($scope, $http, toastr, cfpLoadingBar,commonService) {
        $scope.tablePageSize = 10;
        $scope.param = {"page": 1, "page_size": $scope.tablePageSize};

        $scope.data = {};

        $scope.queryConfig = function () {
            cfpLoadingBar.start();
            var url = "/api/config?page=" + ($scope.param.page || "") +
                "&page_size=" + ($scope.param.page_size || "") +
                "&config_key=" + ($scope.param.config_key || "") +
                "&config_value=" + ($scope.param.config_value || "");
            $http.get(url).success(function (resp) {
                if (resp.success) {
                    $scope.data = resp.data;
                } else {
                    toastr.error(resp.message);
                }
                cfpLoadingBar.complete();
            }).error(function (resp, status) {
                console.log("status:", status);
                toastr.error(resp);
                cfpLoadingBar.complete();
            });

        };
        $scope.queryBtn = function () {
            $scope.param.page = 1;
            $scope.queryConfig();
        }

        $scope.queryConfig();


        $scope.delete = function(id,name){
            commonService.confirm($scope,'确认对话框','您确定要删除 ' + name +' 参数吗？').then(function(result){
                console.log("result...",result);
                if(result == 'ok'){
                    $scope.deleteConfig(id);
                }
            });
        };

        $scope.deleteConfig = function (id) {
            $http.delete("/api/config/" + id).success(function (resp) {
                if (resp.success) {
                    toastr.success('数据删除成功!');
                    $scope.queryConfig();
                } else {
                    toastr.error(resp.message);
                }
            }).error(function (resp, status) {
                console.log("status:", status);
                toastr.error(resp);
            });
        };

        $scope.currentUser= {};
        $scope.queryCurrent = function(){
            $http.get("/api/current/user").success(function (resp) {
                if(resp.success){
                    $scope.currentUser = resp.data;
                } else {
                    toastr.error(resp.message);
                }

            }).error(function () {
                console.log("status:",status);
                toastr.error(resp);
            });
        };
        $scope.queryCurrent();
        

    }

})();
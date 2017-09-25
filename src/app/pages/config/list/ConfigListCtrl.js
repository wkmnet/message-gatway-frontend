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
        
/*
        $scope.currentUser= {};
        $scope.queryCurrent = function (id) {
            $http.get("/api/user/" + id).success(function(resp){
                if(resp.success){
                    $scope.currentUser = resp.data;
                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });
        };


      $scope.getCookie = function(){
            var name = "MANGER-USER-KEY";
            var cookie_value =  $scope.readCookie(name);
            var end = cookie_value.indexOf("-")
            console.log("value : " + cookie_value);
            var id = cookie_value.substring(0,end);
            console.log("currentId : " + id);
            $scope.queryCurrent(id);
        };

        $scope.readCookie = function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        }

        $scope.getCookie();
*/

    }

})();
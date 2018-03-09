/**
 * Create with IntelliJ IDEA
 * Project name : admin-frontend
 * Package name :
 * Author : qinxiangyu
 * User : qxy
 * Date : 17-10-24
 * Time : 下午2:45
 * ---------------------------------
 *
 */

(function(){
    'use strict'

    angular.module('BlurAdmin.pages.tool.redis')
        .controller('RedisListCtrl', RedisListCtrl);

    /** @ngInject */
    function RedisListCtrl($scope, $http, toastr,cfpLoadingBar,commonService) {
        $scope.tablePageSize = 10;
        $scope.param = {"page": 1, "page_size": $scope.tablePageSize};

        $scope.data = {};

        $scope.names = [];
        $scope.getNames = function(){
            $http.get("/api/redis/names").success(function (resp) {
                if (resp.success) {
                    $scope.names = resp.data;
                } else {
                    toastr.error(resp.message);
                }
            }).error(function (resp, status) {
                console.log("status:", status);
                toastr.error(resp);
            });
        };
        $scope.getNames();
        
        $scope.queryRedis= function () {
            console.log("cursor : " + $scope.data.cursor);
            console.log("redis name : " + $scope.param.redis_name);
            var str="";
            if($scope.param.key){
                str = encodeURIComponent($scope.param.key)
            }
            console.log("redis key : " + $scope.param.key);
            console.log("redis key : " + str);
            cfpLoadingBar.start();
            var url = "/api/redis?page=" + ($scope.param.page || "") +
                "&page_size=" + ($scope.param.page_size || "") +
                "&redis_name=" + ($scope.param.redis_name || "") +
                "&pre_page=" + ($scope.param.pre_page || "") +
                "&cursor=" + ($scope.data.cursor|| "") +
                "&key=" + str;
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
            $scope.param.pre_page = $scope.param.page;

        };
        $scope.queryBtn = function () {
            $scope.param.page = 1;
            $scope.queryRedis();
        };

        $scope.delete = function(key){
            commonService.confirm($scope,'确认对话框','您确定要删除【' + key +'】吗？').then(function(result){
                console.log("result...",result);
                if(result == 'ok'){
                    $scope.deleteRedis(key);
                }
            });
        };
        $scope.deleteRedis = function (key) {
            console.log("redis name : " + $scope.param.redis_name);
            var str = encodeURIComponent(key);
            $http.delete("/api/redis/1?key=" + str +"&redis_name=" + $scope.param.redis_name).success(function(resp){
                if(resp.success){
                    toastr.success('数据删除成功!');
                    $scope.queryRedis();
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
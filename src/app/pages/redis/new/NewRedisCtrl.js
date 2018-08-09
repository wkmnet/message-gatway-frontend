/**
 * Create with IntelliJ IDEA
 * Project name : admin-pay-frontend
 * Package name :
 * Author : Wukunmeng
 * User : wukm
 * Date : 17-7-26
 * Time : 下午7:52
 * ---------------------------------
 *
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.pages.redis.new')
        .controller('NewRedisCtrl', NewRedisCtrl);

    /** @ngInject */
    function NewRedisCtrl($stateParams,$http,$scope,toastr) {

        $scope.redis = {};

        $scope.saveRedis = function () {
           
            console.log("save redis:",$scope.redis);
            $http.post("/api/redis",$scope.redis).success(function(response){
                console.log("response:",response);
                if(response.success){
                    toastr.success('数据保存成功!');
                } else {
                    toastr.error(response.message);
                }
            }).error(function(data, status){
                console.log("status:",status);
                toastr.error(data);
            });
        };


        $scope.checkRedis = function () {

            if(!$scope.redis.redis_name){
                toastr.error("redis_name不能为空！");
                return;
            }
            if(!$scope.redis.db){
                toastr.error("db不能为空！");
                return;
            }
            if(!$scope.redis.key){
                toastr.error("key不能为空！");
                return;
            }
            if(!$scope.redis.value){
                toastr.error("value不能为空！");
                return;
            }
            if(!$scope.redis.timeout){
                toastr.error("timeout不能为空！");
                return;
            }

            $scope.saveRedis();
        };

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


        $scope.dbs = [];
        $scope.getDBs = function (){
            $http.get("/api/redis/dbs?redis_name=" + ($scope.redis.redis_name || "")).success(function (resp) {
                if (resp.success) {
                    $scope.dbs = resp.data;
                } else {
                    toastr.error(resp.message);
                }
            }).error(function (resp, status) {
                console.log("status:", status);
                toastr.error(resp);
            });
        };


    }

})();
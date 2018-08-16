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
        .controller('EditRedisCtrl', EditRedisCtrl);

    /** @ngInject */
    function EditRedisCtrl($stateParams,$http,$scope,toastr) {

        $scope.redisKey = $stateParams.redis;
        console.log("redisKey",$stateParams.redis);
        $scope.resource = $stateParams.resource;
        console.log("resource",$stateParams.resource);
        $scope.db = $stateParams.db;
        console.log("db",$stateParams.db);


        $scope.redis = {};
       
        $scope.param={};

        $scope.loadRedis = function() {
            console.log("redis",$scope.redisKey);
            var str="";
            if($scope.redisKey){
                str = encodeURIComponent($scope.redisKey)
            }
            console.log("redis key : " + str);
            var url = "/api/redis/1?key=" + str + "&redis_name=" + ($scope.resource || "") + "&db=" + ($scope.db || "");
            $http.get(url).success(function(response){
                console.log("response:",response);
                if(response.success){
                    $scope.redis = response.data;
                    $scope.redis.redis_name = $scope.resource;
                } else {
                    toastr.error(response.message);
                }
            }).error(function(data, status){
                console.log("status:",status);
                toastr.error(data);
            });
        };
        $scope.loadRedis();

        $scope.saveRedis = function () {
           
            console.log("update redis:",$scope.redis);
            $http.put("/api/redis/1",$scope.redis).success(function(response){
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

            $scope.saveRedis();
        };


    }

})();
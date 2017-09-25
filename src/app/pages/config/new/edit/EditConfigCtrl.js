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

    angular.module('BlurAdmin.pages.config.new')
        .controller('EditConfigCtrl', EditConfigCtrl);

    /** @ngInject */
    function EditConfigCtrl($stateParams,$http,$scope,toastr) {

        $scope.configId = $stateParams.config;
        console.log("configId",$stateParams.config);

        $scope.config = {};
        $scope.param={};

        $scope.loadConfig = function() {
            console.log("config",$scope.configId);
            $http.get("/api/config/" + $scope.configId).success(function(response){
                console.log("response:",response);
                if(response.success){
                    $scope.config = response.data;
                } else {
                    toastr.error(response.message);
                }
            }).error(function(data, status){
                console.log("status:",status);
                toastr.error(data);
            });
        };
        $scope.loadConfig();

        $scope.saveConfig = function () {
            $http.put("/api/config/" + $scope.configId,$scope.config).success(function(response){
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
        $scope.checkConfig = function(){
            if(!$scope.config.config_key){
                toastr.error("系统配置KEY不能为空！");
                return;
            }
            if(!$scope.config.config_value){
                toastr.error("系统配置VALUE不能为空！")
                return;
            }
            $scope.saveConfig();
        };



    }

})();
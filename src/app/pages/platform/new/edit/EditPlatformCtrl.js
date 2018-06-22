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

    angular.module('BlurAdmin.pages.platform.new')
        .controller('EditPlatformCtrl', EditPlatformCtrl);

    /** @ngInject */
    function EditPlatformCtrl($stateParams,$http,$scope,toastr) {

        $scope.platformId = $stateParams.platform;
        console.log("platformId",$stateParams.platform);

        $scope.platform = {"expire_age":1};
        

        $scope.loadPlatform = function() {
            console.log("platform",$scope.platformId);
            $http.get("/api/platform/" + $scope.platformId).success(function(response){
                console.log("response:",response);
                if(response.success){
                    $scope.platform = response.data;
                } else {
                    toastr.error(response.message);
                }
            }).error(function(data, status){
                console.log("status:",status);
                toastr.error(data);
            });
        };
        $scope.loadPlatform();

        $scope.savePlatform= function () {
            console.log("update platform:",$scope.platform);
            $http.put("/api/platform/" + $scope.platformId,$scope.platform).success(function(response){
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


        $scope.checkPlatform = function () {
            if(!$scope.platform.platform_no){
                toastr.error("平台编号为空！");
                return;
            };

            if(!$scope.platform.platform_name) {
                toastr.error("平台名称为空！");
                return;
            };

            if(!$scope.platform.expire_age || $scope.platform.expire_age < 1){
                toastr.error("超时时间不能少于60秒！");
                return;
            };
            if(!$scope.platform.sms_number || $scope.platform.sms_number < 1){
                toastr.error("每个手机号每天发送短信条数不能少于1条！");
                return;
            };
            if(!$scope.platform.sms_interval_time || $scope.platform.sms_interval_time < 1){
                toastr.error("短信间隔时间不能少于60秒！");
                return;
            };
            if(!$scope.platform.platform_key){
                toastr.error("平台密钥不能为空！");
                return;
            };
            $scope.savePlatform();

        };



    }

})();
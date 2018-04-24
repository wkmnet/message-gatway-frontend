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

    angular.module('BlurAdmin.pages.ding.new')
        .controller('EditDingCtrl', EditDingCtrl);

    /** @ngInject */
    function EditDingCtrl($stateParams,$http,$scope,toastr) {

        $scope.dingId = $stateParams.ding;
        console.log("dingId",$stateParams.ding);

        $scope.ding = {};
        

        $scope.loadDing = function() {
            console.log("ding",$scope.dingId);
            $http.get("/api/ding/" + $scope.dingId).success(function(response){
                console.log("response:",response);
                if(response.success){
                    $scope.ding = response.data;
                } else {
                    toastr.error(response.message);
                }
            }).error(function(data, status){
                console.log("status:",status);
                toastr.error(data);
            });
        };
        $scope.loadDing();

        $scope.saveDing= function () {
            console.log("update ding:",$scope.ding);
            $http.put("/api/ding/" + $scope.dingId,$scope.ding).success(function(response){
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


        $scope.checkDing = function () {
            if(!$scope.ding.ding_no){
                toastr.error("编号为空！");
                return;
            }
            if(!$scope.ding.group_name){
                toastr.error("分组名称为空！");
                return;
            };
            if(!$scope.ding.robot_name){
                toastr.error("机器人不能为空！");
                return;
            };
            if(!$scope.ding.url){
                toastr.error("推送地址不能为空！");
                return;
            };

            $scope.saveDing();
        };
        

    }

})();
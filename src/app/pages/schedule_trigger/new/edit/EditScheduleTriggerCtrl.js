/**
 * Create with IntelliJ IDEA
 * Project name : message-gatway-frontend
 * Package name :
 * Author : qinxiangyu
 * User : qxy
 * Date : 17-10-11
 * Time : 下午1:33
 * ---------------------------------
 *
 */

(function(){
    'use strict'

    angular.module('BlurAdmin.pages.schedule_trigger.new')
        .controller('EditScheduleTriggerCtrl', EditScheduleTriggerCtrl);

    /** @ngInject */
    function EditScheduleTriggerCtrl($stateParams,$scope, $http, toastr) {

        $scope.schedule_trigger = {};

        $scope.scheduleTriggerId = $stateParams.schedule_trigger;
        console.log("scheduleTriggerId",$stateParams.schedule_trigger);

        $scope.loadScheduleJob = function() {
            $http.get("/api/schedule_trigger/" + $scope.scheduleTriggerId).success(function(response){
                console.log("response:",response);
                if(response.success){
                    $scope.schedule_trigger = response.data;
                } else {
                    toastr.error(response.message);
                }
            }).error(function(data, status){
                console.log("status:",status);
                toastr.error(data);
            });
        };
        $scope.loadScheduleJob();

        $scope.saveScheduleTrigger = function () {
            console.log("save schedule_trigger:", $scope.schedule_trigger);
            $http.put("/api/schedule_trigger/" + $scope.scheduleTriggerId, $scope.schedule_trigger).success(function (response) {
                console.log("response:", response);
                if (response.success) {
                    toastr.success('数据保存成功!');
                } else {
                    toastr.error(response.message);
                }
            }).error(function (data, status) {
                console.log("status:", status);
                toastr.error(data);
            });
        };

        $scope.checkScheduleTrigger = function () {
            if (!$scope.schedule_trigger.trigger_name) {
                toastr.error("触发器名称为空！");
                return;
            }
            if (!$scope.schedule_trigger.trigger_group) {
                toastr.error("触发器组名称为空！");
                return;
            }
            if (!$scope.schedule_trigger.trigger_type) {
                toastr.error("触发器类型为空！");
                return;
            }
            if (!$scope.schedule_trigger.cron_expression) {
                toastr.error("表达式为空！");
                return;
            }
            console.log("schedule trigger count:" + $scope.schedule_trigger.trigger_count);
            if ($scope.schedule_trigger.trigger_count < 0) {
                toastr.error("触发次数不正确！");
                return;
            }
            if ($scope.schedule_trigger.trigger_interval < 0) {
                toastr.error("触发间隔不正确！");
                return;
            }
            $scope.saveScheduleTrigger();
        };


    };

})();

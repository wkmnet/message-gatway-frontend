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

(function () {
    'use strict'

    angular.module('BlurAdmin.pages.schedule_job.new')
        .controller('NewScheduleJobCtrl', NewScheduleJobCtrl);

    /** @ngInject */
    function NewScheduleJobCtrl($scope, $http, toastr) {
        $scope.schedule_job = {};
        $scope.triggers = {}

        $scope.saveScheduleJob = function () {
            console.log("save schedule_job:", $scope.schedule_job);
            $http.post("/api/schedule_job", $scope.schedule_job).success(function (response) {
                console.log("response:", response);
                if (response.success) {
                    toastr.success('数据保存成功!');
                    $scope.schedule_job = {};
                } else {
                    toastr.error(response.message);
                }
            }).error(function (data, status) {
                console.log("status:", status);
                toastr.error(data);
            });
        };

        $scope.checkScheduleJob = function () {
            if (!$scope.schedule_job.job_alias) {
                toastr.error("任务别名为空！");
                return;
            }
            if (!$scope.schedule_job.job_name) {
                toastr.error("任务名称为空！");
                return;
            }
            if (!$scope.schedule_job.job_group) {
                toastr.error("任务分组为空！");
                return;
            }
            if (!$scope.schedule_job.job_impl) {
                toastr.error("任务实现为空！");
                return;
            }
            if (!$scope.schedule_job.trigger_id) {
                toastr.error("触发器ID为空！");
                return;
            }
            $scope.saveScheduleJob();
        };

        $scope.queryScheduleTrigger = function () {
            $http.get("/api/schedule_trigger").success(function (resp) {
                if (resp.success) {
                    $scope.triggers = resp.data;
                } else {
                    toastr.error(resp.message);
                }
                cfpLoadingBar.complete();
            }).error(function (resp, status) {
                console.log("status:", status);
                toastr.error(resp);
            });

        };
        $scope.queryScheduleTrigger();


    };

})();

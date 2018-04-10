/**
 * Create with IntelliJ IDEA
 * Project name : message-gatway-frontend
 * Package name :
 * Author : qinxiangyu
 * User : qxy
 * Date : 17-10-11
 * Time : 下午1:23
 * ---------------------------------
 *
 */

(function(){
    'use strict'

    angular.module('BlurAdmin.pages.schedule_job.list')
        .controller('ScheduleJobListCtrl', ScheduleJobListCtrl);

    /** @ngInject */
    function ScheduleJobListCtrl($scope, $http, toastr, cfpLoadingBar,commonService) {
        $scope.tablePageSize = 10;
        $scope.param = {"page":1,"page_size":$scope.tablePageSize};
        $scope.data = {};

        $scope.queryScheduleJob= function () {
            cfpLoadingBar.start();
            var url = "/api/schedule_job?page=" + ($scope.param.page || "") +
                "&page_size=" + ($scope.param.page_size || "") +
                "&job_alias=" + ($scope.param.job_alias || "") +
                "&job_name=" + ($scope.param.job_name || "") +
                "&job_group=" + ($scope.param.job_group || "");
            $http.get(url).success(function(resp){
                if(resp.success){
                    $scope.data = resp.data;
                } else {
                    toastr.error(resp.message);
                }
                cfpLoadingBar.complete();
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
                cfpLoadingBar.complete();
            });

        };

        $scope.queryBtn = function(){
            $scope.param.page = 1;
            $scope.queryScheduleJob();
        };
        $scope.queryScheduleJob();
    
        $scope.delete = function(id,name){
            commonService.confirm($scope,'确认对话框','您确定要删除定时任务 ' + name +' 吗？').then(function(result){
                console.log("result...",result);
                if(result == 'ok'){
                    $scope.deleteScheduleJob(id);
                }
            });
        };
        $scope.deleteScheduleJob = function(id){
            $http.delete("/api/schedule_job/" + id).success(function(resp){
                if(resp.success){
                    toastr.success('数据删除成功!');
                    $scope.queryScheduleJob();
                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });
        };

        $scope.switchStatus = function(id,name,isValidate){
            var content = "";
            if(isValidate == '0'){
                content = '禁用';
            }
            if(isValidate == '1'){
                content = '启用';
            }
            commonService.confirm($scope,'确认对话框','您确定要' + content + "[" + name +']定时任务吗？').then(function(result){
                console.log("result...",result);
                if(result == 'ok'){
                    $scope.switchIsValidate(id,isValidate);
                }
            });
        };
        
        $scope.switchIsValidate = function(id,isValidate){
            console.log("id:",id);
            console.log("isValidate",isValidate);
            $http.put("/api/schedule_job/" + id,{"job_enable":isValidate}).success(function(response){
                if(response.success){
                    $scope.queryScheduleJob();
                }else{
                    toastr.error(response.message)
                }
            }).error(function(resp,status){
                console.log("status",status);
                toastr.error(resp);
            });

        };

        $scope.strToJson = function (str){
            var jsonStr;
            if(str){
                jsonStr = JSON.stringify(JSON.parse(str), undefined, 4);
                console.log("jsonStr ", jsonStr);
            }
            return jsonStr;
        }

    };

})();
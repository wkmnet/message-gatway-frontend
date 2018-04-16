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

    angular.module('BlurAdmin.pages.schedule_trigger.list')
        .controller('ScheduleTriggerListCtrl', ScheduleTriggerListCtrl);

    /** @ngInject */
    function ScheduleTriggerListCtrl($scope, $http, toastr, cfpLoadingBar,commonService) {
        $scope.tablePageSize = 10;
        $scope.param = {"page":1,"page_size":$scope.tablePageSize};
        $scope.data = {};

        $scope.queryScheduleTrigger= function () {
            cfpLoadingBar.start();
            var url = "/api/schedule_trigger?page=" + ($scope.param.page || "") +
                "&page_size=" + ($scope.param.page_size || "") +
                "&trigger_name=" + ($scope.param.trigger_name || "");
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
            $scope.queryScheduleTrigger();
        };
        $scope.queryScheduleTrigger();
    
        $scope.delete = function(id,name){
            commonService.confirm($scope,'确认对话框','您确定要删除触发器 ' + name +' 吗？').then(function(result){
                console.log("result...",result);
                if(result == 'ok'){
                    $scope.deleteScheduleTrigger(id);
                }
            });
        };
        $scope.deleteScheduleTrigger = function(id){
            $http.delete("/api/schedule_trigger/" + id).success(function(resp){
                if(resp.success){
                    toastr.success('数据删除成功!');
                    $scope.queryScheduleTrigger();
                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });
        };
        

    };

})();
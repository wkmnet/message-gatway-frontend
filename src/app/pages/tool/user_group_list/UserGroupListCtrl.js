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

    angular.module('BlurAdmin.pages.tool.user_group_list')
        .controller('UserGroupListCtrl', UserGroupListCtrl);

    /** @ngInject */
    function UserGroupListCtrl($scope, $http, toastr,cfpLoadingBar,commonService) {
        $scope.data = {};
        $scope.param = {};
        
        $scope.queryUserGropList= function () {
            cfpLoadingBar.start();
            $http.get("/api/user_group_list/"+$scope.param.user_id).success(function (resp) {
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

        };
        $scope.addUserGroupList = function () {
            console.log("save user group list:", $scope.param);
            $http.post("/api/user_group_list", $scope.param).success(function (response) {
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

        $scope.delete = function(id){
            commonService.confirm($scope,'确认对话框','您确定要删除【' + id +'】吗？').then(function(result){
                console.log("result...",result);
                if(result == 'ok'){
                    $scope.deleteUserGroupList(id);
                }
            });
        };
        $scope.deleteUserGroupList = function (key) {
            console.log("delete id : " + key);
            var str = encodeURIComponent(key);
            $http.delete("/api/user_group_list/" + key).success(function(resp){
                if(resp.success){
                    toastr.success('数据删除成功!');
                    $scope.queryUserGropList();
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
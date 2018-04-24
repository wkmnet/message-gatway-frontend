/**
 * Create with IntelliJ IDEA
 * Project name : blur-admin-1.2.0
 * Package name :
 * Author : Wukunmeng
 * User : wukm
 * Date : 17-7-20
 * Time : 上午11:31
 * ---------------------------------
 *
 */
(function(){
    'use strict'

    angular.module('BlurAdmin.pages.group.list')
        .controller('GroupListCtrl', GroupListCtrl).controller("DingGroupRelationCtrl",DingGroupRelationCtrl);

    /** @ngInject */
    function GroupListCtrl($scope, $http, toastr,cfpLoadingBar,commonService,$uibModal) {
        $scope.tablePageSize = 10;
        $scope.param = {"page":1,"page_size":$scope.tablePageSize};

        $scope.data = {};

        $scope.queryGroup = function () {
            cfpLoadingBar.start();
            var url = "/api/group?page=" + ($scope.param.page || "") +
                "&page_size=" + ($scope.param.page_size || "") +
                "&group_no=" + ($scope.param.group_no || "") +
                "&group_name=" + ($scope.param.group_name || "");
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
            $scope.queryGroup ();
        }
        
        $scope.queryGroup ();

        $scope.delete = function(id,name){
            commonService.confirm($scope,'确认对话框','您确定要删除 ' + name +' 分组吗？').then(function(result){
                console.log("result...",result);
                if(result == 'ok'){
                    $scope.deleteGroup (id);
                }
            });
        };
        $scope.deleteGroup= function (id) {
            $http.delete("/api/group/" + id).success(function(resp){
                if(resp.success){
                    toastr.success('数据删除成功!');
                    $scope.queryDing();
                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });
        };

        $scope.openRelation = function (id) {
            console.log("open relation")
            $uibModal.open({
                animation: true,
                templateUrl: "app/pages/group/list/relation_modal.html",
                controller:"DingGroupRelationCtrl",
                resolve: {
                    id:function(){
                        console.log("group id :" + id);
                        return id;
                    }
                }
            });
        };
        
    }



    function DingGroupRelationCtrl($scope, $http, toastr,id) {
        $scope.groupId = id;
        console.log("groupId : ", $scope.groupId)
        $scope.member = {};
        $scope.nonMember = {}

        $scope.getMember = function () {
            $http.get("/api/relate/get_member?group_id=" + $scope.groupId).success(function (resp) {
                if(resp.success){
                    $scope.member = resp.data;
                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });
        };
        
        $scope.getNonMember = function () {
            $http.get("/api/relate/get_non_member?group_id=" + $scope.groupId).success(function (resp) {
                if(resp.success){
                    $scope.nonMember = resp.data;
                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });
        };
        $scope.getMember();
        $scope.getNonMember();

        $scope.add = function(id){
            $http.get("/api/relate/related?group_id=" + $scope.groupId + "&ding_id=" + id).success(function(resp){
                if(resp.success){
                    toastr.success('添加成功!');
                    $scope.getMember();
                    $scope.getNonMember();
                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });
        }

        $scope.remove = function(id){
            $http.get("/api/relate/unRelated?id=" + id).success(function(resp){
                if(resp.success){
                    toastr.success('添加成功!');
                    $scope.getMember();
                    $scope.getNonMember();
                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });
        }
    }

})();
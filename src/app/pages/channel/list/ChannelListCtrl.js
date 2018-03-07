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

    angular.module('BlurAdmin.pages.channel.list')
        .controller('ChannelListCtrl', ChannelListCtrl);

    /** @ngInject */
    function ChannelListCtrl($scope, $http, toastr, cfpLoadingBar,commonService) {
        $scope.tablePageSize = 10;
        $scope.param = {"page":1,"page_size":$scope.tablePageSize};
        $scope.data = {};

        $scope.queryChannel = function () {
            cfpLoadingBar.start();
            var url = "/api/channel?page=" + ($scope.param.page || "") +
                "&page_size=" + ($scope.param.page_size || "") +
                "&channel_no=" + ($scope.param.channel_no || "") +
                "&channel_name=" + ($scope.param.channel_name || "") +
                "&class_name=" + ($scope.param.class_name || "");
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
            $scope.queryChannel();
        };
        $scope.queryChannel();

        $scope.switchStatus = function(id,name,isValidate){
            var content = "";
            if(isValidate == '0'){
                content = '禁用';
            }
            if(isValidate == '1'){
                content = '启用';
            }
            commonService.confirm($scope,'确认对话框','您确定要' + content + "[" + name +']短信渠道吗？').then(function(result){
                console.log("result...",result);
                if(result == 'ok'){
                    $scope.switchIsValidate(id,isValidate);
                }
            });
        };
        
        $scope.switchIsValidate = function(id,isValidate){
            console.log("id:",id);
            console.log("isValidate",isValidate);
            $http.put("/api/channel/" + id,{"is_validate":isValidate}).success(function(response){
                if(response.success){
                    $scope.queryChannel();
                }else{
                    toastr.error(response.message)
                }
            }).error(function(resp,status){
                console.log("status",status);
                toastr.error(resp);
            });
            
        };
        $scope.delete = function(id,name){
            commonService.confirm($scope,'确认对话框','您确定要删除 ' + name +' 短信渠道吗？').then(function(result){
                console.log("result...",result);
                if(result == 'ok'){
                    $scope.deleteChannel(id);
                }
            });
        };
        $scope.deleteChannel = function(id){
            $http.delete("/api/channel/" + id).success(function(resp){
                if(resp.success){
                    toastr.success('数据删除成功!');
                    $scope.queryChannel();
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
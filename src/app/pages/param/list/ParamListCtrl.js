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

    angular.module('BlurAdmin.pages.param.list')
        .controller('ParamListCtrl', ParamListCtrl);

    /** @ngInject */
    function ParamListCtrl($scope, $http, toastr, cfpLoadingBar,commonService) {
        $scope.tablePageSize = 10;
        $scope.param = {"page":1,"page_size":$scope.tablePageSize};
        $scope.data = {};
        $scope.channels = {};
        
        $scope.getChannels = function(){
            $http.get("/api/channel").success(function(response){
                if(response.success){
                    $scope.channels = response.data;
                    console.log("channels: " , $scope.channels);
                }else{
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });
        };
        $scope.getChannels();

        $scope.queryParam = function () {
            cfpLoadingBar.start();
            var url = "/api/param?page=" + ($scope.param.page || "") +
                "&page_size=" + ($scope.param.page_size || "") +
                "&param_key=" + ($scope.param.param_key || "") +
                "&channel_no=" + ($scope.param.channel_no || "") +
                "&description=" + ($scope.param.description || "");
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
            $scope.queryParam();
        };
        $scope.queryParam();
    
        $scope.delete = function(id,name){
            commonService.confirm($scope,'确认对话框','您确定要删除 ' + name +' 参数吗？').then(function(result){
                console.log("result...",result);
                if(result == 'ok'){
                    $scope.deleteParam(id);
                }
            });
        };
        $scope.deleteParam = function(id){
            $http.delete("/api/param/" + id).success(function(resp){
                if(resp.success){
                    toastr.success('数据删除成功!');
                    $scope.queryParam();
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
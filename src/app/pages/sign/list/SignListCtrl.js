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

    angular.module('BlurAdmin.pages.sign.list')
        .controller('SignListCtrl', SmssignListCtrl);

    /** @ngInject */
    function SmssignListCtrl($scope, $http, toastr, cfpLoadingBar,commonService) {
        $scope.tablePageSize = 10;
        $scope.param = {"page":1,"page_size":$scope.tablePageSize};
        $scope.data = {};

        $scope.querySmsSign= function () {
            cfpLoadingBar.start();
            var url = "/api/sign?page=" + ($scope.param.page || "") +
                "&page_size=" + ($scope.param.page_size || "") +
                "&sign_no=" + ($scope.param.sign_no || "") +
                "&sign=" + ($scope.param.sign || "");
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
            $scope.querySmsSign();
        };
        $scope.querySmsSign();
    
        $scope.delete = function(id,name){
            commonService.confirm($scope,'确认对话框','您确定要删除签名 ' + name +' 吗？').then(function(result){
                console.log("result...",result);
                if(result == 'ok'){
                    $scope.deleteSmsSign(id);
                }
            });
        };
        $scope.deleteSmsSign = function(id){
            $http.delete("/api/sign/" + id).success(function(resp){
                if(resp.success){
                    toastr.success('数据删除成功!');
                    $scope.querySmsSign();
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
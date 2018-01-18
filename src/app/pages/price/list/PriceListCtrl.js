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

    angular.module('BlurAdmin.pages.price.list')
        .controller('PriceListCtrl', PriceListCtrl);

    /** @ngInject */
    function PriceListCtrl($scope, $http, toastr, cfpLoadingBar,commonService) {
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

        $scope.queryPrice = function () {
            cfpLoadingBar.start();
            var url = "/api/price/query?page=" + ($scope.param.page || "") +
                "&page_size=" + ($scope.param.page_size || "") +
                "&channel_no=" + ($scope.param.channel_no || "") +
                "&country_name=" + ($scope.param.country_name || "") +
                "&country_code=" + ($scope.param.country_code || "");
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
            $scope.queryPrice();
        };
        $scope.queryPrice();

        $scope.delete = function(id,channel_no,name){
            commonService.confirm($scope,'确认对话框','您确定要删除渠道' + channel_no  + name +' 的价格吗？').then(function(result){
                console.log("result...",result);
                if(result == 'ok'){
                    $scope.deletePrice(id);
                }
            });
        };
        $scope.deletePrice = function(id){
            $http.delete("/api/price/drop/" + id).success(function(resp){
                if(resp.success){
                    toastr.success('数据删除成功!');
                    $scope.queryPrice();
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
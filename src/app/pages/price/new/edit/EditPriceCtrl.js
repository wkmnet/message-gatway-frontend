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

    angular.module('BlurAdmin.pages.price.new')
        .controller('EditPriceCtrl', EditPriceCtrl);

    /** @ngInject */
    function EditPriceCtrl($stateParams,$scope, $http, toastr) {
        $scope.price = {};
        $scope.priceId = $stateParams.price;
        console.log("priceId",$stateParams.price);

        $scope.loadPrice = function() {
            $http.get("/api/price/queryOne/" + $scope.priceId).success(function(response){
                console.log("response:",response);
                if(response.success){
                    $scope.price = response.data;
                } else {
                    toastr.error(response.message);
                }
            }).error(function(data, status){
                console.log("status:",status);
                toastr.error(data);
            });
        };
        $scope.loadPrice();

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

        $scope.savePrice = function () {
            console.log("save price:", $scope.price);
            $http.put("/api/price/change/" + $scope.priceId, $scope.price).success(function (response) {
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

        $scope.checkPrice= function () {
            if (!$scope.price.price) {
                toastr.error("请填写价格！");
                return;
            }

            $scope.savePrice();
        };


    };

})();

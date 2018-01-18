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

    angular.module('BlurAdmin.pages.price.new')
        .controller('NewPriceCtrl', NewPriceCtrl);

    /** @ngInject */
    function NewPriceCtrl($scope, $http, toastr) {
        $scope.channels = {};
        $scope.price = {};

        $scope.savePrice = function () {
            console.log("save price:", $scope.price);
            $http.post("/api/price/save", $scope.price).success(function (response) {
                console.log("response:", response);
                if (response.success) {
                    toastr.success('数据保存成功!');
                    $scope.price = {};
                } else {
                    toastr.error(response.message);
                }
            }).error(function (data, status) {
                console.log("status:", status);
                toastr.error(data);
            });
        };

        $scope.checkPrice = function () {
            if (!$scope.price.channel_no) {
                toastr.error("请选择短信通道！");
                return;
            }
            if (!$scope.price.country_name) {
                toastr.error("国家名称为空！");
                return;
            }
            if (!$scope.price.country_code) {
                toastr.error("国家代码为空！");
                return;
            }
            if (!$scope.price.price) {
                toastr.error("价格为空！");
                return;
            }
            
            $scope.savePrice();
        };
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

    };

})();

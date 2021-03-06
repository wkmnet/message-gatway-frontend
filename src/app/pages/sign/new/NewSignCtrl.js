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

    angular.module('BlurAdmin.pages.sign.new')
        .controller('NewSignCtrl', NewSignCtrl);

    /** @ngInject */
    function NewSignCtrl($scope, $http, toastr) {
        $scope.sign = {};

        $scope.saveSign = function () {
            console.log("save sign:", $scope.sign);
            $http.post("/api/sign", $scope.sign).success(function (response) {
                console.log("response:", response);
                if (response.success) {
                    toastr.success('数据保存成功!');
                    $scope.sign = {};
                } else {
                    toastr.error(response.message);
                }
            }).error(function (data, status) {
                console.log("status:", status);
                toastr.error(data);
            });
        };

        $scope.checkSign = function () {
            if (!$scope.sign.sign_no) {
                toastr.error("签名编号为空！");
                return;
            }
            if (!$scope.sign.sign) {
                toastr.error("短信签名为空！");
                return;
            }
            
            $scope.saveSign();
        };

    };

})();

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

    angular.module('BlurAdmin.pages.sms.notice')
        .controller('SmsNoticeCtrl', SmsNoticeCtrl);

    /** @ngInject */
    function SmsNoticeCtrl($scope, $http, toastr) {
        $scope.notice = {};
        $scope.signs = {};

        $scope.sendNotice = function () {
            console.log("save notice:", $scope.notice);
            $http.post("/api/notice", $scope.notice).success(function (response) {
                console.log("response:", response);
                if (response.success) {
                    toastr.success('短信发送成功!');
                } else {
                    toastr.error(response.message);
                }
            }).error(function (data, status) {
                console.log("status:", status);
                toastr.error(data);
            });
        };

        $scope.querySign= function () {
            $http.get("/api/sign").success(function(resp){
                if(resp.success){
                    $scope.signs = resp.data;
                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });

        };
        $scope.querySign();

        $scope.checkNotice = function () {
            if (!$scope.notice.signNo) {
                toastr.error("签名编号为空！");
                return;
            }
            if (!$scope.notice.phones) {
                toastr.error("手机号码为空！");
                return;
            }
            if (!$scope.notice.content) {
                toastr.error("短信内容为空！");
                return;
            }
            
            $scope.sendNotice();
        };

    };

})();

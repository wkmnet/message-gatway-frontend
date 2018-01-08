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

(function () {
    'use strict'

    angular.module('BlurAdmin.pages.sms.list')
        .controller('SmsCtrl', SmsCtrl);

    /** @ngInject */
    function SmsCtrl($scope, $http, toastr, cfpLoadingBar, commonService) {
        $scope.tablePageSize = 10;
        $scope.param = {"page": 1, "page_size": $scope.tablePageSize};
        $scope.data = {};
        $scope.channels = {};
        $scope.platforms = {};
        $scope.openList = true;

        $scope.getChannels = function () {
            $http.get("/api/channel").success(function (response) {
                if (response.success) {
                    $scope.channels = response.data;
                    console.log("channels: ", $scope.channels);
                } else {
                    toastr.error(resp.message);
                }
            }).error(function (resp, status) {
                console.log("status:", status);
                toastr.error(resp);
            });
        };
        $scope.getChannels();

        $scope.getPlatforms = function () {
            $http.get("/api/platform").success(function (response) {
                if (response.success) {
                    $scope.platforms = response.data;
                    console.log("platforms: ", $scope.platforms);
                } else {
                    toastr.error(resp.message);
                }
            }).error(function (resp, status) {
                console.log("status:", status);
                toastr.error(resp);
            });
        };
        $scope.getPlatforms();

        $scope.querySms = function () {
            cfpLoadingBar.start();
            var url = "/api/sms?page=" + ($scope.param.page || "") +
                "&page_size=" + ($scope.param.page_size || "") +
                "&channel_no=" + ($scope.param.channel_no || "") +
                "&platform_no=" + ($scope.param.platform_no || "") +
                "&status=" + ($scope.param.status || "") +
                "&country=" + ($scope.param.country || "") +
                "&message_id=" + ($scope.param.message_id || "") +
                "&phone=" + ($scope.param.phone || "");
            $http.get(url).success(function (resp) {
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

        $scope.queryBtn = function () {
            $scope.param.page = 1;
            $scope.querySms();
        };
        $scope.querySms();

        $scope.isJson = function (str) {
            if (typeof str == 'string') {
                try {
                    var obj = JSON.parse(str);
                    if (str.indexOf('{') > -1) {
                        return true;
                    } else {
                        return false;
                    }
                } catch (e) {
                    return false;
                }
            }
            return false;
        }
        $scope.strToJson = function (channel_no, str) {
            if ($scope.isJson(str)) {
                var json = JSON.stringify(JSON.parse(str), undefined, 2);
                console.log("json ", json);
                return json;
            }
            return str;
        };

     /*   $scope.sendAgain = function (index) {
            console.log("index : ",index);
            cfpLoadingBar.start();
            $http.post("/api/send/code",$scope.data.list[index]).success(function (resp) {
                if (resp.success) {
                    toastr.success("重新发送短信提交成功!");
                } else {
                    toastr.error(resp.message);
                }
                cfpLoadingBar.complete();
            }).error(function (resp, status) {
                console.log("status:", status);
                toastr.error(resp);
                cfpLoadingBar.complete();
            });
        };*/

        $scope.sms={};
        $scope.open = function(index){
            $scope.sms = $scope.data.list[index];
            
            $scope.openList = false;
        };

        $scope.goBack = function(){
            $scope.openList = true;
        };


    };

})();
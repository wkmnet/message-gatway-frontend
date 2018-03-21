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

    angular.module('BlurAdmin.pages.email_list.list')
        .controller('EmailCtrl', EmailCtrl);

    /** @ngInject */
    function EmailCtrl($scope, $http, toastr, cfpLoadingBar, commonService) {
        $scope.tablePageSize = 10;
        $scope.param = {"page": 1, "page_size": $scope.tablePageSize};
        $scope.data = {};
        $scope.channels = {};
        $scope.platforms = {};
        $scope.openList = true;

        $scope.getChannels = function () {
            var url = "/api/channel?type=1";
            $http.get(url).success(function (response) {
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

        $scope.queryEmail = function () {
            cfpLoadingBar.start();
            var url = "/api/email?page=" + ($scope.param.page || "") +
                "&page_size=" + ($scope.param.page_size || "") +
                "&channel_no=" + ($scope.param.channel_no || "") +
                "&platform_no=" + ($scope.param.platform_no || "") +
                "&status=" + ($scope.param.status || "") +
                "&from_address=" + ($scope.param.from_address || "") +
                "&from_name=" + ($scope.param.from_name || "") +
                "&start=" + ($scope.param.start || "") +
                "&end=" + ($scope.param.end || "") +
                "&to_address=" + ($scope.param.to_address || "");
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
            $scope.queryEmail();
        };
        $scope.queryEmail();

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

        $scope.email={};
        $scope.open = function(index){
            $scope.email = $scope.data.list[index];
            
            $scope.openList = false;
        };

        $scope.goBack = function(){
            $scope.openList = true;
        };

        $scope.selectDate = function () {
            $scope.showDatePicker = !$scope.showDatePicker;
        }

        $scope.changeDate = function (modelName, newDate) {
            console.log("modelName:" + modelName + "---newDate:" + newDate);
            if("start" == modelName){
                $scope.param.start = newDate.format("YYYY-MM-DD");
            } else {
                $scope.param.end = newDate.format("YYYY-MM-DD");
            }
        }

        $scope.clearDate = function () {
            $scope.param.start = "";
            $scope.param.end = "";
        }

        $scope.closeDatePicker = function () {
            $scope.showDatePicker = false;
        }

    };

})();
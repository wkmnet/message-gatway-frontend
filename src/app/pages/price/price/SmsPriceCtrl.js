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

    angular.module('BlurAdmin.pages.price.price')
        .controller('SmsPriceCtrl', SmsPriceCtrl);

    /** @ngInject */
    function SmsPriceCtrl($scope, $http, toastr,cfpLoadingBar) {
        $scope.channels = {};

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

        $scope.param = {};

        $scope.uploadFile = function () {
            cfpLoadingBar.start();
            var fd = new FormData();
            fd.append('file', $scope.param.file);
            fd.append("channel_no", $scope.param.channel_no);
            $http({
                method: 'POST',
                url: "api/price/fileUpload",
                data: fd,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                //上传成功的操作
                if(response.success){
                    toastr.success('提交成功，短信价格处理中!');
                } else {
                    toastr.error(response.message);
                }
                cfpLoadingBar.complete();

            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
                cfpLoadingBar.complete();
            });
        };

        $scope.checkFile = function () {
            console.log("param :", $scope.param);
            if (!$scope.param.channel_no) {
                toastr.error("短信通道为空！");
                return;
            }
            var file = document.getElementById('file').files[0];
            console.log("file :", file);
            $scope.param.file = file;
            if (!$scope.param.file) {
                toastr.error("文件为空！");
                return;
            }
            $scope.uploadFile();
        };

    };

})();

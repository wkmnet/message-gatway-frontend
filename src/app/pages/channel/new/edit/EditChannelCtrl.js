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

    angular.module('BlurAdmin.pages.channel.new')
        .controller('EditChannelCtrl', EditChannelCtrl);

    /** @ngInject */
    function EditChannelCtrl($stateParams,$http,$scope,toastr) {
        $scope.channel = {};
        $scope.classes = {};

        $scope.channelId = $stateParams.channel;
        console.log("channelId",$stateParams.channel);

        $scope.loadChannel = function() {
            $http.get("/api/channel/" + $scope.channelId).success(function(response){
                console.log("response:",response);
                if(response.success){
                    $scope.channel = response.data;
                } else {
                    toastr.error(response.message);
                }
            }).error(function(data, status){
                console.log("status:",status);
                toastr.error(data);
            });
        };
        $scope.loadChannel();

        $scope.saveChannel = function () {
            console.log("save channel:", $scope.channel);
            $http.put("/api/channel/" + $scope.channelId, $scope.channel).success(function (response) {
                console.log("response:", response);
                if (response.success) {
                    toastr.success('数据保存成功!');
                    $scope.user = {};
                } else {
                    toastr.error(response.message);
                }
            }).error(function (data, status) {
                console.log("status:", status);
                toastr.error(data);
            });
        };

        $scope.checkChannel = function () {
            if (!$scope.channel.channel_no) {
                toastr.error("短信通道编号为空！");
                return;
            }
            if (!$scope.channel.channel_name) {
                toastr.error("短信名称为空！");
                return;
            }
            if (!$scope.channel.class_name) {
                toastr.error("关联实现类不能为空！");
                return;
            }
            if (!$scope.channel.level) {
                toastr.error("优先级为空！");
                return;
            }
            var reg = new RegExp("^(\\d|[1-9]\\d|100)$");
            if (!reg.test($scope.channel.level)) {
                toastr.error("优先级为0-100数字,不填默认100最低优先级!）");
                return;
            }
            $scope.saveChannel();
        };

        $scope.getImplementClass = function () {
            $http.get("/api/channel/getImplementClass").success(function(response){
                if(response.success){
                    $scope.classes = response.data;
                }else{
                    toastr.error(response.message)
                }
            }).error(function(resp,status){
                console.log("status",status);
                toastr.error(resp);
            });
        };
        $scope.getImplementClass();

    };

})();

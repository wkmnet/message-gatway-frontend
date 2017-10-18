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

    angular.module('BlurAdmin.pages.param.new')
        .controller('EditParamCtrl', EditParamCtrl);

    /** @ngInject */
    function EditParamCtrl($stateParams,$scope, $http, toastr) {

        $scope.channels = {};
        $scope.param = {};

        $scope.paramId = $stateParams.param;
        console.log("paramId",$stateParams.param);

        $scope.loadParam = function() {
            $http.get("/api/param/" + $scope.paramId).success(function(response){
                console.log("response:",response);
                if(response.success){
                    $scope.param = response.data;
                } else {
                    toastr.error(response.message);
                }
            }).error(function(data, status){
                console.log("status:",status);
                toastr.error(data);
            });
        };
        $scope.loadParam();

        $scope.saveParam = function () {
            console.log("save param:", $scope.param);
            $http.put("/api/param/" + $scope.paramId, $scope.param).success(function (response) {
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

        $scope.checkParam = function () {
            if (!$scope.param.channel_no) {
                toastr.error("请选择短信通道！");
                return;
            }
            if (!$scope.param.param_key) {
                toastr.error("参数名为空！");
                return;
            }
            if (!$scope.param.param_value) {
                toastr.error("参数值为空！");
                return;
            }
            if (!$scope.param.description) {
                toastr.error("参数描述为空！");
                return;
            }

            $scope.saveParam();
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

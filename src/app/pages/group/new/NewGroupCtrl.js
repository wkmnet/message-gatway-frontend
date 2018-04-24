/**
 * Create with IntelliJ IDEA
 * Project name : admin-pay-frontend
 * Package name :
 * Author : Wukunmeng
 * User : wukm
 * Date : 17-7-26
 * Time : 下午7:21
 * ---------------------------------
 *
 */

(function(){
    'use strict'

    angular.module('BlurAdmin.pages.group.new')
        .controller('NewGroupCtrl', NewGroupCtrl);

    /** @ngInject */
    function NewGroupCtrl($scope, $http, toastr) {

        $scope.group = {};

        $scope.saveGroup = function () {
            console.log("save group:",$scope.group);

            $http.post("/api/group",$scope.group).success(function(response){
                console.log("response:",response);
                if(response.success){
                    toastr.success('数据保存成功!');
                    $scope.group = {};
                } else {
                    toastr.error(response.message);
                }
            }).error(function(data, status){
                console.log("status:",status);
                toastr.error(data);
            });
        };


        $scope.checkGroup = function () {
            if(!$scope.group.group_no){
                toastr.error("分组编号为空！");
                return;
            }
            if(!$scope.group.group_name){
                toastr.error("分组名称为空！");
                return;
            };

            $scope.saveGroup();
        };

    }

})();
/**
 * Create with IntelliJ IDEA
 * Project name : admin-pay-frontend
 * Package name :
 * Author : Wukunmeng
 * User : wukm
 * Date : 17-7-26
 * Time : 下午7:52
 * ---------------------------------
 *
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.pages.group.new')
        .controller('EditGroupCtrl', EditGroupCtrl);

    /** @ngInject */
    function EditGroupCtrl($stateParams,$http,$scope,toastr) {

        $scope.groupId = $stateParams.group;
        console.log("groupId",$stateParams.group);

        $scope.group = {};

        $scope.loadGroup = function() {
            console.log("group ",$scope.groupId);
            $http.get("/api/group/" + $scope.groupId).success(function(response){
                console.log("response:",response);
                if(response.success){
                    $scope.group = response.data;
                } else {
                    toastr.error(response.message);
                }
            }).error(function(data, status){
                console.log("status:",status);
                toastr.error(data);
            });
        };
        $scope.loadGroup();

        $scope.saveGroup= function () {
            console.log("update group:",$scope.group);
            $http.put("/api/group/" + $scope.groupId,$scope.group).success(function(response){
                console.log("response:",response);
                if(response.success){
                    toastr.success('数据保存成功!');
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
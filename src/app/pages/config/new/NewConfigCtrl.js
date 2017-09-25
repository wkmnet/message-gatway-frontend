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

    angular.module('BlurAdmin.pages.config.new')
        .controller('NewConfigCtrl', NewConfigCtrl);

    /** @ngInject */
    function NewConfigCtrl($scope, $http, toastr) {

        $scope.config = {};

        $scope.saveConfig = function () {
            console.log("save config:",$scope.config);

            $http.post("/api/config",$scope.config).success(function(response){
                console.log("response:",response);
                if(response.success){
                    toastr.success('数据保存成功!');
                    $scope.config = {};
                } else {
                    toastr.error(response.message);
                }
            }).error(function(data, status){
                console.log("status:",status);
                toastr.error(data);
            });
        };

        $scope.checkConfig = function(){
            console.log("currentUser : " + $scope.currentUser.role)
            if($scope.currentUser.role == "admin"){
                if(!$scope.config.config_key){
                    toastr.error("系统配置KEY不能为空！");
                    return;
                }
                if(!$scope.config.config_value){
                    toastr.error("系统配置VALUE不能为空！")
                    return;
                }
                $scope.saveConfig();
            }else{
                toastr.error("您不是管理员，没有新建系统配置的权限！");
            }
           
        };


        
        
        $scope.currentUser= {};
        $scope.queryCurrent = function (id) {
            $http.get("/api/user/" + id).success(function(resp){
                if(resp.success){
                    $scope.currentUser = resp.data;
                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });
        };


        $scope.getCookie = function(){
            var name = "MANGER-USER-KEY";
            var cookie_value =  $scope.readCookie(name);
            var end = cookie_value.indexOf("-")
            console.log("value : " + cookie_value);
            var id = cookie_value.substring(0,end);
            console.log("currentId : " + id);
            $scope.queryCurrent(id);
        };

        $scope.readCookie = function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        }

        $scope.getCookie();



    }

})();
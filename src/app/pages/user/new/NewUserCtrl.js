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

    angular.module('BlurAdmin.pages.user.new')
        .controller('NewUserCtrl', NewUserCtrl);

    /** @ngInject */
    function NewUserCtrl($scope, $http, toastr) {

        $scope.user = {};

        $scope.saveUser = function () {
            console.log("save user:",$scope.user);

            $http.post("/api/user",$scope.user).success(function(response){
                console.log("response:",response);
                if(response.success){
                    toastr.success('数据保存成功!');
                    $scope.user = {};
                } else {
                    toastr.error(response.message);
                }
            }).error(function(data, status){
                console.log("status:",status);
                toastr.error(data);
            });
        };

        $scope.checkUser = function(){
            var regEmail = /^([a-zA-Z0-9_-])+\@([a-zA-Z0-9_-])+.([a-zA-Z])+$/;
            var regPwd =/^[a-z0-9_]{6,18}$/;
            console.log("$scope.currentUser.role : " + $scope.currentUser.role)
            if($scope.currentUser.role == "admin"){
                if(!$scope.user.email || !regEmail.test($scope.user.email)){
                    toastr.error("邮箱格式不正确！");
                    return;
                }
                if(!$scope.user.user_name){
                    toastr.error("用户名不能为空！")
                    return;
                }
                if(!$scope.user.role){
                    toastr.error("用户角色不能为空！")
                    return;
                }
                if(!regPwd.test($scope.user.password)){
                    toastr.error("密码格式不正确！6-18位，字母、数字、下划线");
                    return;
                }
                $scope.saveUser();
            }else{
                toastr.error("您不是管理员，没有新建用户的权限！");
            }
        }


        $scope.currentUser= {};
        $scope.queryCurrent = function(){
            $http.get("/api/current/user").success(function (resp) {
                if(resp.success){
                    $scope.currentUser = resp.data;
                } else {
                    toastr.error(resp.message);
                }
                
            }).error(function () {
                console.log("status:",status);
                toastr.error(resp);
            });
        };
        $scope.queryCurrent();
        /*$scope.queryCurrent = function (id) {
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
*/


    }

})();
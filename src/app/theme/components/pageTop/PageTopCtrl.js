/**
 * Create with IntelliJ IDEA
 * Project name : admin-pay-frontend
 * Package name :
 * Author : Wukunmeng
 * User : wukm
 * Date : 17-9-15
 * Time : 下午3:17
 * ---------------------------------
 *
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('PageTopCtrl', PageTopCtrl);

    /** @ngInject */
    function PageTopCtrl($scope, $http, $sce) {
        $scope.userInfo = {user_name:"未找到"};
        $http.get('/api/current/user').success(function(resp){
            if(resp.success){
                $scope.userInfo = resp.data;
            } else {
                console.log("resp:",resp);
            }
        }).error(function(resp,status){
            console.log("status:",status);
            console.log("resp:",resp);
        });
    }
})();
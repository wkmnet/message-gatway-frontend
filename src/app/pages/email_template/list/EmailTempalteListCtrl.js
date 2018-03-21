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

(function(){
    'use strict'

    angular.module('BlurAdmin.pages.email_template.list')
        .controller('EmailTemplateListCtrl', EmailTemplateListCtrl);

    /** @ngInject */
    function EmailTemplateListCtrl($scope, $http, toastr, cfpLoadingBar,commonService) {
        $scope.tablePageSize = 10;
        $scope.param = {"page":1,"page_size":$scope.tablePageSize};
        $scope.data = {};

        $scope.queryEmailTemplate= function () {
            cfpLoadingBar.start();
            var url = "/api/email_template?page=" + ($scope.param.page || "") +
                "&page_size=" + ($scope.param.page_size || "") +
                "&template_name=" + ($scope.param.template_name || "") +
                "&from_address=" + ($scope.param.from_address || "") +
                "&from_name=" + ($scope.param.from_name || "") +
                "&refer_template=" + ($scope.param.refer_template || "");
            $http.get(url).success(function(resp){
                if(resp.success){
                    $scope.data = resp.data;
                } else {
                    toastr.error(resp.message);
                }
                cfpLoadingBar.complete();
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
                cfpLoadingBar.complete();
            });

        };

        $scope.queryBtn = function(){
            $scope.param.page = 1;
            $scope.queryEmailTemplate();
        };
        $scope.queryEmailTemplate();
    
        $scope.delete = function(id,name){
            commonService.confirm($scope,'确认对话框','您确定要删除邮件模板 ' + name +' 吗？').then(function(result){
                console.log("result...",result);
                if(result == 'ok'){
                    $scope.deleteEmailTemplate(id);
                }
            });
        };
        $scope.deleteEmailTemplate = function(id){
            $http.delete("/api/email_template/" + id).success(function(resp){
                if(resp.success){
                    toastr.success('数据删除成功!');
                    $scope.queryTemplate();
                } else {
                    toastr.error(resp.message);
                }
            }).error(function(resp,status){
                console.log("status:",status);
                toastr.error(resp);
            });
        };

    };

})();
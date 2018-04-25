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

    angular.module('BlurAdmin.pages.d_template.list')
        .controller('DingTemplateListCtrl', DingTemplateListCtrl);

    /** @ngInject */
    function DingTemplateListCtrl($scope, $http, toastr, cfpLoadingBar,commonService) {
        $scope.tablePageSize = 10;
        $scope.param = {"page":1,"page_size":$scope.tablePageSize};
        $scope.data = {};

        $scope.queryDingTemplate= function () {
            cfpLoadingBar.start();
            var url = "/api/ding_template?page=" + ($scope.param.page || "") +
                "&page_size=" + ($scope.param.page_size || "") +
                "&template_no=" + ($scope.param.template_no || "") +
                "&template=" + ($scope.param.template || "");
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
            $scope.queryDingTemplate();
        };
        $scope.queryDingTemplate();
    
        $scope.delete = function(id,name){
            commonService.confirm($scope,'确认对话框','您确定要删除钉钉模板 ' + name +' 吗？').then(function(result){
                console.log("result...",result);
                if(result == 'ok'){
                    $scope.deleteDingTemplate(id);
                }
            });
        };
        $scope.deleteDingTemplate = function(id){
            $http.delete("/api/ding_template/" + id).success(function(resp){
                if(resp.success){
                    toastr.success('数据删除成功!');
                    $scope.queryDingTemplate();
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
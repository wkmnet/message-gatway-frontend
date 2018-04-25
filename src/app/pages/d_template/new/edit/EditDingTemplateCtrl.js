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

    angular.module('BlurAdmin.pages.d_template.new')
        .controller('EditDingTemplateCtrl', EditDingTemplateCtrl);

    /** @ngInject */
    function EditDingTemplateCtrl($stateParams,$scope, $http, toastr) {

        $scope.template = {};

        $scope.templateId = $stateParams.ding_template;
        console.log("templateId", $scope.templateId);

        $scope.loadTemplate = function() {
            $http.get("/api/ding_template/" + $scope.templateId).success(function(response){
                console.log("response:",response);
                if(response.success){
                    $scope.template = response.data;
                } else {
                    toastr.error(response.message);
                }
            }).error(function(data, status){
                console.log("status:",status);
                toastr.error(data);
            });
        };
        $scope.loadTemplate();

        $scope.saveTemplate = function () {
            console.log("save template:", $scope.template);
            $http.put("/api/ding_template/" + $scope.templateId, $scope.template).success(function (response) {
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

        $scope.checkTemplate = function () {
            if (!$scope.template.template_no) {
                toastr.error("短信模板编号为空！");
                return;
            }
            if (!$scope.template.template) {
                toastr.error("短信模板为空！");
                return;
            }
            $scope.saveTemplate();
        };


    };

})();

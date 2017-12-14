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

(function () {
    'use strict'

    angular.module('BlurAdmin.pages.template.new')
        .controller('NewTemplateCtrl', NewTemplateCtrl);

    /** @ngInject */
    function NewTemplateCtrl($scope, $http, toastr) {
        $scope.template = {};

        $scope.saveTemplate = function () {
            console.log("save template:", $scope.template);
            $http.post("/api/template", $scope.template).success(function (response) {
                console.log("response:", response);
                if (response.success) {
                    toastr.success('数据保存成功!');
                    $scope.template = {};
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

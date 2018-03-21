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

    angular.module('BlurAdmin.pages.email_template.new')
        .controller('NewEmailTemplateCtrl', NewEmailTemplateCtrl);

    /** @ngInject */
    function NewEmailTemplateCtrl($scope, $http, toastr) {
        $scope.template = {};
        $scope.template.content_type = '0';

        $scope.saveEmailTemplate = function () {
            console.log("save email template:", $scope.template);
            $http.post("/api/email_template", $scope.template).success(function (response) {
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
            if (!$scope.template.template_name) {
                toastr.error("邮件模板名称为空！");
                return;
            }
            if (!$scope.template.from_address) {
                toastr.error("邮件发送地址为空！");
                return;
            }
            if (!$scope.template.from_name) {
                toastr.error("邮件发送地址名称为空！");
                return;
            }
            if (!$scope.template.subject) {
                toastr.error("邮件主题为空！");
                return;
            }
            if (!$scope.template.content_summary) {
                toastr.error("邮件摘要为空！");
                return;
            }
            if (!$scope.template.reply_to) {
                toastr.error("邮件回复地址为空！");
                return;
            }
            if ($scope.template.content_type == '0') {
                if (!$scope.template.refer_template) {
                    toastr.error("第三方邮件模板为空！");
                    return;
                }
            }
            $scope.saveTemplate();
        };

    };

})();

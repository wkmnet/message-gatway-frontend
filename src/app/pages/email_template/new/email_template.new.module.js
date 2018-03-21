/**
 * Create with IntelliJ IDEA
 * Project name : message-gatway-frontend
 * Package name :
 * Author : Wukunmeng
 * User : qxy
 * Date : 17-10-11
 * Time : 下午1:14
 * ---------------------------------
 *
 */

(function () {
    'use strict';

    angular.module("BlurAdmin.pages.email_template.new",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('email_template.new', {
                url: '/new',
                template: '<ui-view></ui-view>',
                controller: "NewEmailTemplateCtrl",
                title: '新建邮件模板',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 100,
                },
            }).state('email_template.new.create', {
            url: '/create',
            templateUrl: 'app/pages/email_template/new/email_template.html',
            title: '新建邮件模板',
            controller: "NewEmailTemplateCtrl",
            controllerAs: "newEmailTemplateCtrl"
        }).state('email_template.new.edit', {
            url: '/edit/:email_template',
            templateUrl: 'app/pages/email_template/new/edit/email_template.html',
            title: '编辑邮件模板',
            controller: "EditEmailTemplateCtrl",
            controllerAs: "editEmailTemplateCtrl"
        });
        $urlRouterProvider.when('/email_template/new','/email_template/new/create');
    }
})();
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

    angular.module("BlurAdmin.pages.d_template.new",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('d_template.new', {
                url: '/new',
                template: '<ui-view></ui-view>',
                controller: "NewDingTemplateCtrl",
                title: '新建钉钉模板',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 100,
                },
            }).state('d_template.new.create', {
            url: '/create',
            templateUrl: 'app/pages/d_template/new/ding_template.html',
            title: '新建钉钉模板',
            controller: "NewDingTemplateCtrl",
            controllerAs: "newDingTemplateCtrl"
        }).state('d_template.new.edit', {
            url: '/edit/:ding_template',
            templateUrl: 'app/pages/d_template/new/edit/ding_template.html',
            title: '编辑钉钉模板',
            controller: "EditDingTemplateCtrl",
            controllerAs: "editDingTemplateCtrl"
        });
        $urlRouterProvider.when('/d_template/new','/d_template/new/create');
    }
})();
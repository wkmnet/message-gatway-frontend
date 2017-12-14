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

    angular.module("BlurAdmin.pages.template.new",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('template.new', {
                url: '/new',
                template: '<ui-view></ui-view>',
                controller: "NewTemplateCtrl",
                title: '新建短信模板',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 100,
                },
            }).state('template.new.create', {
            url: '/create',
            templateUrl: 'app/pages/template/new/template.html',
            title: '新建短信模板',
            controller: "NewTemplateCtrl",
            controllerAs: "newTemplateCtrl"
        }).state('template.new.edit', {
            url: '/edit/:template',
            templateUrl: 'app/pages/template/new/edit/template.html',
            title: '编辑短信模板',
            controller: "EditTemplateCtrl",
            controllerAs: "editTemplateCtrl"
        });
        $urlRouterProvider.when('/template/new','/template/new/create');
    }
})();